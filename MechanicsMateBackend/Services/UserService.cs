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
            using (var mme = new MechanicsMateEntities())
            {
                var user = new User();
                var hasher = new PasswordHasher();
                user.Email = userCreate.Email;
                user.PasswordHash = hasher.Hash(userCreate.Password);
                user.FirstName = userCreate.FirstName;
                user.LastName = userCreate.LastName;
                user.UserType = userCreate.UserType;
                mme.Users.Add(user);
                await mme.SaveChangesAsync();
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
                    UserEmail = user.Email,
                    UserType = user.UserType,
                    Token = token
                };
            }
        }
        
        public async Task<UserResponse> LoginUser(UserLogin userLogin)
        {
            using (var mme = new MechanicsMateEntities())
            {
                var user = await mme.Users.Where(u => u.Email == userLogin.Email).FirstOrDefaultAsync();
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
            using (var mme = new MechanicsMateEntities())
            {
                var user = await mme.Users.Where(u => u.Email == email).FirstOrDefaultAsync();
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
            using (var mme = new MechanicsMateEntities())
            {
                var user = await mme.Users.Where(u => u.Email == email).FirstOrDefaultAsync();
                mme.Users.Remove(user);
                await mme.SaveChangesAsync();
            }
        }
    }
}
