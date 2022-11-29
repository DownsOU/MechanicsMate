using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MechanicsMateBackend.Models;
using MechanicsMateBackend.Models.VM;
using Microsoft.EntityFrameworkCore;

namespace MechanicsMateBackend.Services
{
    public class UserService
    {
        public async Task<UserResponse> AddUser(UserCreate userCreate)
        {
            using (var mmd = new mechanics_mate_devContext())
            {
                var user = new User();
                var hasher = new PasswordHasher();
                user.Email = userCreate.Email;
                user.PasswordHash = hasher.Hash(userCreate.Password);
                user.FirstName = userCreate.FirstName;
                user.LastName = userCreate.LastName;
                user.UserType = userCreate.UserType;
                mmd.Users.Add(user);
                await mmd.SaveChangesAsync();
                var tokenGen = new TokenGenerator(
                            "THISISTHETOKENKEY",
                            "jwt",
                            "jwt",
                            "120"
                            );
                string token = tokenGen.GenerateJWTToken((userId: user.UserId.ToString(), userEmail: user.Email, userType: user.UserType));
                return new UserResponse
                {
                    Status = "Success",
                    UserId = user.UserId,
                    UserEmail = user.Email,
                    UserType = user.UserType,
                    Token = token
                };
            }
        }
        
        public async Task<UserResponse> LoginUser(UserLogin userLogin)
        {
            using (var mmd = new mechanics_mate_devContext())
            {
                var user = await mmd.Users.Where(u => u.Email == userLogin.Email).FirstOrDefaultAsync();
                if (user == null)
                {
                    throw new ApplicationException("User not found");
                }
                else
                {
                    var hasher = new PasswordHasher();
                    if(!hasher.Check(user.PasswordHash, userLogin.Password))
                    {
                        throw new ApplicationException("Invalid Email or Password");
                    }
                    else
                    {
                        var tokenGen = new TokenGenerator(
                            "THISISTHETOKENKEY",
                            "jwt",
                            "jwt",
                            "120"
                            );
                        string token = tokenGen.GenerateJWTToken((userId: user.UserId.ToString(), userEmail: user.Email, userType: user.UserType));
                        return new UserResponse
                        {
                            Status = "Success",
                            UserId = user.UserId,
                            UserEmail = user.Email,
                            UserType = user.UserType,
                            Token = token
                        };
                    }
                }
            }  
        }

        public async Task<UserDetail> GetCurrentUserDetails(string email)
        {
            using (var mmd = new mechanics_mate_devContext())
            {
                var user = await mmd.Users.Where(u => u.Email == email).FirstOrDefaultAsync();
                return new UserDetail
                {
                    UserId = user.UserId,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    UserType = user.UserType,
                };
            }
        }

        public async Task DeleteCurrentUser(string email)
        {
            using (var mmd = new mechanics_mate_devContext())
            {
                var user = await mmd.Users.Where(u => u.Email == email).FirstOrDefaultAsync();
                mmd.Users.Remove(user);
                await mmd.SaveChangesAsync();
            }
        }

        public async Task RequestUserAccess(AccessRequest request)
        {
            using (var mmd = new mechanics_mate_devContext())
            {
                var requestedUser = await mmd.Users.Where(u => u.Email == request.RequestedUserEmail).FirstOrDefaultAsync();
                if(requestedUser == null)
                {
                    throw new ApplicationException("User not found");
                }
                var requestedUserId = requestedUser.UserId;
                mmd.UserAccesses.Add(new UserAccess
                {
                    ServiceProviderId = request.RequestorUserId,
                    VehicleOwnerId = requestedUserId,
                    RequestStatus = (int)RequestStatus.Pending,
                });
                await mmd.SaveChangesAsync();
            }
        }

        public async Task ApproveOrRejectUserAccess(ApproveRejectAccess arAccess)
        {
            using (var mmd = new mechanics_mate_devContext())
            {
                var userAccess = await mmd.UserAccesses.Where(ua => ua.ServiceProviderId == arAccess.ServiceProviderId && ua.VehicleOwnerId == arAccess.OwnerId).FirstOrDefaultAsync();
                if (arAccess.ApproveReject == "Approve")
                {
                    userAccess.RequestStatus = (int)RequestStatus.Accepted;
                    return;
                }
                if (arAccess.ApproveReject == "Reject")
                {
                    userAccess.RequestStatus = (int)RequestStatus.Rejected;
                    return;
                }
            }
        }

        public async Task<List<UserAccess>> GetPendingRequests(int userId)
        {
            using (var mmd = new mechanics_mate_devContext())
            {
                return await mmd.UserAccesses.Where(ua => ua.VehicleOwnerId == userId && ua.RequestStatus == (int)RequestStatus.Pending).ToListAsync();
            }
        }
    }
}
