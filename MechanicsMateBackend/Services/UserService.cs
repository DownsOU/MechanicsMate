using System;
using System.Collections.Generic;
using System.IO;
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
        public async Task<List<ServiceType>> GetServiceType()
        {
            using (var mmd = new mechanics_mate_devContext())
            {
                List<ServiceType> serviceList = new List<ServiceType>();  
                serviceList = await mmd.ServiceTypes.ToListAsync<ServiceType>();
                return serviceList;
            }
        }
        public async Task<List<int> > GetVehicle (int ownerId)
        {
            using (var mme = new mechanics_mate_devContext())
            {
                Console.WriteLine("getting vehicle list");
                var vehicles = await (from v in mme.Vehicles where v.OwnerId == ownerId select v).ToListAsync<Vehicle>();
                //List<int> selectedIds = new List<int>{73920154,73920264};
                List<int> selectedIds = new List<int>();
                selectedIds = vehicles.Select(x =>x.VehicleInfoId).ToList();
                //await GetVehicleList(vehicles);
                return selectedIds;    
            }
        }
        public async Task <List<Mg1nYearMakeModelMasterAdvanced>> getVehicleList(List<int> vehicleId)
        {
            using (var mme = new mechanics_mate_devContext()){
            List<Mg1nYearMakeModelMasterAdvanced> lstVehicle = new List<Mg1nYearMakeModelMasterAdvanced>();  
            lstVehicle = await(from VehicleList in mme.Mg1nYearMakeModelMasterAdvanceds where vehicleId.Contains(VehicleList.YmmId) select VehicleList).ToListAsync<Mg1nYearMakeModelMasterAdvanced>();  

            return lstVehicle;  
            }
        }
        public async Task <List<User>> getServicerVehicles(List<int> ownerId)
        {
            Console.Write("getting provider vehciles");
            using (var mme = new mechanics_mate_devContext()){
            var lstVehicle = await(from v in mme.Users where ownerId.Contains(v.UserId) select v).ToListAsync<User>();  
            return lstVehicle;

            }
        }
        public async Task <List<Vehicle>> getOwnerVehicles(int ownerId)
        {
            using (var mme = new mechanics_mate_devContext()){
            Console.WriteLine("getting Owners Vehicles");
            var ownersVehicles = await (from v in mme.Vehicles where v.OwnerId == ownerId select v).ToListAsync<Vehicle>();
            return ownersVehicles;   
            }   
        }
        public async Task <List<ServiceLog>> getServiceLogs(int ownerId)
        {
            using (var mme = new mechanics_mate_devContext()){
            var serviceLogs = await (from v in mme.ServiceLogs where v.ServicerId == ownerId select v).ToListAsync<ServiceLog>();
            return serviceLogs;   
            }
        }
        public async Task <List<UserAccess>> getServicerAccess(int ownerId)
        {
            using (var mme = new mechanics_mate_devContext()){
            var serviceLogs = await (from v in mme.UserAccesses where ownerId ==v.ServiceProviderId select v).ToListAsync<UserAccess>();
            return serviceLogs;   
            }
        }
        public async Task <List<ServiceLog>> getServiceLogs1(List<int> vehicleId)
        {
            using (var mme = new mechanics_mate_devContext()){
            var serviceLogs = await (from v in mme.ServiceLogs where vehicleId.Contains(v.VehicleId)  select v).ToListAsync<ServiceLog>();
            return serviceLogs;   
            }
        }
        public async Task <Vehicle> ymmToVehicleId(int ymm)
        {
            using (var mme = new mechanics_mate_devContext()){
            var vehicle = await (from v in mme.Vehicles where ymm ==v.VehicleInfoId select v).FirstOrDefaultAsync();
            return vehicle;   
            }
        }
        public async Task<ServiceResponse> AddService(ServiceLog serviceCreate, Stream invoice)
        {
            using (var mmd = new mechanics_mate_devContext())
            {
                var service = new ServiceLog();
                service.ServicerId = serviceCreate.ServicerId;
                service.ServiceTypeId = serviceCreate.ServiceTypeId;
                service.VehicleId = serviceCreate.VehicleId;
                service.CustomServiceName = serviceCreate.CustomServiceName;
                service.CustomServiceInterval = serviceCreate.CustomServiceInterval;
                service.CurrentMileage = serviceCreate.CurrentMileage;
                service.ServiceDate = serviceCreate.ServiceDate;
                service.ServiceNotes = serviceCreate.ServiceNotes;
                MemoryStream ms = new MemoryStream();
                invoice.CopyTo(ms);
                service.InvoicePath = ms.ToArray();
                mmd.ServiceLogs.Add(service);
                var vehicle = mmd.Vehicles.Where(v => v.VehicleId == serviceCreate.VehicleId).FirstOrDefault();
                vehicle.Mileage = serviceCreate.CurrentMileage;
                await mmd.SaveChangesAsync();
                return new ServiceResponse
                {
                    Status = "Success",
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
                var emailList = await mmd.Users.Select(u => u.Email).Distinct().ToListAsync();
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

        public async Task<List<PendingRequest>> GetPendingRequests(int userId)
        {
            using (var mmd = new mechanics_mate_devContext())
            {
                var pendingRequestList = new List<PendingRequest>();
                var requestsFromDB = await mmd.UserAccesses.Where(ua => ua.VehicleOwnerId == userId && ua.RequestStatus == (int)RequestStatus.Pending)
                    .Include(ua => ua.ServiceProvider).ToListAsync();
                foreach(var request in requestsFromDB)
                {
                    pendingRequestList.Add(new PendingRequest
                    {
                        ServiceProviderId = request.ServiceProviderId,
                        VehicleOwnerID = request.VehicleOwnerId,
                        ServiceProviderName = request.ServiceProvider.FirstName + " " +request.ServiceProvider.LastName
                    });
                }
                return pendingRequestList;
            }
        }

        public async Task<List<ServiceNotification>> GetServiceNotifications(int userId)
        {
            using (var mmd = new mechanics_mate_devContext())
            {
                var userServiceLogList = new List<ServiceLog>();

                var user = await mmd.Users.Where(u => u.UserId == userId).FirstOrDefaultAsync();
                if (user.UserType == "S")
                {
                    var userAccessList = await mmd.UserAccesses.Where(ua => ua.ServiceProviderId == userId && ua.RequestStatus == (int)RequestStatus.Accepted).Select(ua => ua.VehicleOwner).ToListAsync();
                    IEnumerable<ServiceLog> serviceLogEnumerable = mmd.ServiceLogs
                       .Include(sl => sl.Vehicle)
                       .Include(sl => sl.Vehicle.Owner)
                       .Include(sl => sl.ServiceType)
                       .Include(sl => sl.Servicer).AsEnumerable();
                    IEnumerable<ServiceLog> userServiceLogEnumerable = serviceLogEnumerable.Where(s => userAccessList.Any(ua => ua.UserId == s.Vehicle.OwnerId));
                    userServiceLogList = userServiceLogEnumerable.ToList();
                }
                else
                {
                    userServiceLogList = await mmd.ServiceLogs.Where(sl => sl.Vehicle.OwnerId == userId)
                        .Include(sl => sl.Vehicle)
                        .Include(sl => sl.Vehicle.Owner)
                        .Include(sl => sl.ServiceType)
                        .Include(sl => sl.Servicer).ToListAsync();
                }
                var serviceNotificationList = new List<ServiceNotification>();
                foreach(var userService in userServiceLogList)
                {
                    if(userService.ServiceTypeId.HasValue || userService.CustomServiceInterval != 0)
                    {
                        uint nextServiceMileage = 0;
                        if (userService.ServiceType.ServiceName != "Custom Service") 
                        {
                            nextServiceMileage = userService.Vehicle.Mileage + userService.ServiceType.ServiceInterval.GetValueOrDefault();
                        }
                        else
                        {
                            nextServiceMileage = userService.Vehicle.Mileage + userService.CustomServiceInterval.GetValueOrDefault();
                        }

                        TimeSpan timeSpan = DateTime.Now - userService.ServiceDate;
                        var daysSinceLastService = timeSpan.Days;

                        var estimatedVehicleMileage = userService.Vehicle.Mileage + (daysSinceLastService * userService.Vehicle.DrivingHabit);

                        var estimatedMileageRemaining = (int)nextServiceMileage - estimatedVehicleMileage;

                        if (estimatedMileageRemaining <= 100)
                        {
                            serviceNotificationList.Add(new ServiceNotification {
                                ServiceName = userService.CustomServiceName ?? userService.ServiceType.ServiceName,
                                EstimatedMileageRemaining = estimatedMileageRemaining.GetValueOrDefault(),
                                OwnerEmail = userService.Vehicle.Owner.Email,
                                ServicerEmail = userService.Servicer.Email
                            }) ;
                        }
                    }
                }
                return serviceNotificationList;
            }
        }

        public async Task<string> ApproveOrRejectRequest(ApproveRejectAccess approveReject)
        {
            using (var mmd = new mechanics_mate_devContext())
            {
                try
                {
                    var request = await mmd.UserAccesses.Where(ua => ua.VehicleOwnerId == approveReject.OwnerId
                    && ua.ServiceProviderId == approveReject.ServiceProviderId).FirstOrDefaultAsync();
                    if (approveReject.ApproveReject == "Approve")
                    {
                        request.RequestStatus = (int)RequestStatus.Accepted;
                    }
                    else
                    {
                        request.RequestStatus = (int)RequestStatus.Rejected;
                    }
                    await mmd.SaveChangesAsync();
                    return "success";
                }
                catch
                {
                    return "failure";
                }
            }
        }

        public async Task<List<UserDetail>> GetServiceProviderList()
        {
            using (var mmd = new mechanics_mate_devContext())
            {
                var providerList = new List<UserDetail>();
                var userList = await mmd.Users.Where(u => u.UserType == "S").ToListAsync();
                foreach (var user in userList)
                {
                    providerList.Add(new UserDetail
                    {
                        UserId = user.UserId,
                        Email = user.Email,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        UserType = user.UserType,
                    });
                }
                return providerList;
            }
        }
    }
}
