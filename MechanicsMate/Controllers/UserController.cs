using Microsoft.AspNetCore.Mvc;
using MechanicsMateBackend.Models;
using MechanicsMateBackend.Models.VM;
using MechanicsMateBackend.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace MechanicsMate.Controllers
{
    public class EmailObject
    {
        public string email { get; set; }
    }
    public class VehicleObject
    {
        public int ownerId { get; set; }
    }
    public class ServiceObject
    {
        public int servicerId { get; set; }
    }
    [EnableCors("CorsPolicy")]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController: ControllerBase
    {
        [HttpPost]
        [Route("AddUser")]
        public async Task<UserResponse> AddUser([FromBody]UserCreate userCreate)
        {
            var us = new UserService();
            return await us.AddUser(userCreate);
        }

        [HttpPost]
        [Route("LoginUser")]
        public async Task<UserResponse> LoginUser([FromBody]UserLogin userLogin)
        {
            var us = new UserService();
            return await us.LoginUser(userLogin);
        }
        [HttpPost]
        [Route("GetVehicle")]
        public async Task <List<Mg1nYearMakeModelMasterAdvanced>>  GetVehicle([FromBody] VehicleObject vehicleobj)
        {
            var us = new UserService();
            var vehicleIds =  await us.GetVehicle(vehicleobj.ownerId);
            //var y = new List<int> {73920264,73920154};
            var vehicleList = await us.getVehicleList(vehicleIds);
            return vehicleList;
        }
        [HttpPost]
        [Route("GetOwnerVehicles")]
        public async Task <List<Vehicle>>  GetOwnerVehicles([FromBody] VehicleObject vehicleobj)
        {
            var us = new UserService();
            var ownerVehicles =  await us.getOwnerVehicles(vehicleobj.ownerId);
            return ownerVehicles;
        }
        [HttpPost]
        [Route("AddService")]
        public async Task<ServiceResponse> AddService([FromBody]ServiceLog serviceCreate)
        {
            var us = new UserService();
            return await us.AddService(serviceCreate);
        }

        [HttpPost]
        [Route("GetCurrentUserDetails")]
        public async Task<UserDetail> GetCurrentUserDetails([FromBody] EmailObject emailObj)
        {
            var us = new UserService();
            return await us.GetCurrentUserDetails(emailObj.email);
        }
        [HttpPost]
        [Route("GetServiceType")]
        public async Task<List<ServiceType>> GetServiceType()
        {
            var us = new UserService();
            return await us.GetServiceType();
        }
        [HttpPost]
        [Route("GetServiceLog")]
        public async Task <List<ServiceLog>>  GetServiceLogs([FromBody] ServiceObject vehicleobj)
        {
            var us = new UserService();
            var serviceLogs =  await us.getServiceLogs(vehicleobj.servicerId);
            return serviceLogs;
        }
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        [Route("DeleteCurrentUser")]
        public async Task DeleteCurrentUser([FromBody] EmailObject emailObj)
        {
            var us = new UserService();
            await us.DeleteCurrentUser(emailObj.email);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        [Route("RequestUserAccess")]
        public async Task RequestUserAccess([FromBody] AccessRequest request)
        {
            var us = new UserService();
            await us.RequestUserAccess(request);
        }

        [HttpGet]
        [Route("GetPendingRequests")]
        public async Task<List<PendingRequest>> GetPendingRequests(int userId)
        {
            var us = new UserService();
            return await us.GetPendingRequests(userId);
        }

        [HttpGet]
        [Route("GetServiceProviderList")]
        public async Task<List<UserDetail>> GetServiceProviderList()
        {
            var us = new UserService();
            return await us.GetServiceProviderList();
        }
    }
}
