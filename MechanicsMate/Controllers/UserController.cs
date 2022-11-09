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
        [Route("GetCurrentUserDetails")]
        public async Task<UserDetail> GetCurrentUserDetails([FromBody] EmailObject emailObj)
        {
            var us = new UserService();
            return await us.GetCurrentUserDetails(emailObj.email);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        [Route("DeleteCurrentUser")]
        public async Task DeleteCurrentUser([FromBody] EmailObject emailObj)
        {
            var us = new UserService();
            await us.DeleteCurrentUser(emailObj.email);
        }

    }
}
