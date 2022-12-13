using Microsoft.AspNetCore.Mvc;
using MechanicsMateBackend.Models;
using MechanicsMateBackend.Models.VM;
using MechanicsMateBackend.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Net.Http.Formatting;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;

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
    public class YmmId{
        public int ymmId { get; set; }
    }
    public class ServiceObject
    {
        public int servicerId { get; set; }
    }
    public class ServiceVehiclesObject
    {
        public List<int> serviceVehicleId{get;set;}
    }
    public class ServicerAccessObject
    {
        public int servicerAccess{get;set;}
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
        [RequestSizeLimit(10000000)]
        [Route("AddService")]
        public async Task<ServiceResponse> AddService([FromForm] IFormCollection serviceCreate)
        {
            var us = new UserService();
            var service = JsonConvert.DeserializeObject<ServiceLog>(serviceCreate["serviceCreate"]);
            var invoice = serviceCreate.Files.FirstOrDefault();
            var invoiceStream = invoice.OpenReadStream();
            return await us.AddService(service, invoiceStream);
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
        [Route("ymmToVehicleId")]
        public async Task<Vehicle> YmmToVehcileId([FromBody] YmmId vehicleobj)
        {
            var us = new UserService();
            return await us.ymmToVehicleId(vehicleobj.ymmId);
        }
        [HttpPost]
        [Route("GetServiceLog")]
        public async Task <List<ServiceLog>>  GetServiceLogs([FromBody] ServiceObject vehicleobj)
        {
            var us = new UserService();
            var serviceLogs =  await us.getServiceLogs(vehicleobj.servicerId);
            return serviceLogs;
        }
        [HttpPost]
        [Route("GetServiceLog1")]
        public async Task <List<ServiceLog>>  GetServiceLogs1([FromBody] ServiceVehiclesObject vehicleobj)
        {
            var us = new UserService();
            var serviceLogs =  await us.getServiceLogs1(vehicleobj.serviceVehicleId);
            return serviceLogs;
        }
        [HttpPost]
        [Route("GetServicerVehicles")]
        public async Task <List<User>>  GetServicerVehicles([FromBody] ServiceVehiclesObject vehicleobj)
        {
            var us = new UserService();
            var servicerVehicles =  await us.getServicerVehicles(vehicleobj.serviceVehicleId);
            return servicerVehicles;
        }
        [HttpPost]
        [Route("GetServicerAccess")]
        public async Task <List<UserAccess>>  GetServicerAccess([FromBody] ServicerAccessObject accessobj)
        {
            var us = new UserService();
            var servicerAccess =  await us.getServicerAccess(accessobj.servicerAccess);
            return servicerAccess;
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
        [Route("GetServiceNotifications")]
        public async Task<List<ServiceNotification>> GetServiceNotifications(int userId)
        {
            var us = new UserService();
            return await us.GetServiceNotifications(userId);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        [Route("ApproveOrRejectRequest")]
        public async Task<string> ApproveOrRejectRequest([FromBody] ApproveRejectAccess approveReject)
        {
            var us = new UserService();
            return await us.ApproveOrRejectRequest(approveReject);
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
