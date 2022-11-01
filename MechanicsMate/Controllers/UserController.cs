using Microsoft.AspNetCore.Mvc;
using MechanicsMateBackend.Models;
using MechanicsMateBackend.Models.VM;
using MechanicsMateBackend.Services;

namespace MechanicsMate.Controllers
{
    public class UserResponse
    {
        public string Status { get; set; }
        public string Message { get; set; }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class UserController: ControllerBase
    {
        [HttpPost]
        [Route("AddUser")]
        public async Task AddUser([FromBody]UserCreate userCreate)
        {
            var us = new UserService();
            await us.AddUser(userCreate);
        }

        [HttpPost]
        [Route("LoginUser")]
        public async Task<UserResponse> LoginUser([FromBody]UserLogin userLogin)
        {
            var us = new UserService();
            var successfulLogin = await us.LoginUser(userLogin);
            if(successfulLogin)
            {
                return new UserResponse
                {
                    Status = "Success", Message = "Logged In"
                };
            }
            else
            {
                return new UserResponse
                {
                    Status = "Failure",
                    Message = "Email or Password is incorrect"
                };
            }
        }
    }
}
