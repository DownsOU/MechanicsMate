using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MechanicsMateBackend.Models.VM
{
    public class UserResponse
    {
        public string Status { get; set; }
        public string UserEmail { get; set; }
        public string UserType { get; set; }
        public string Token { get; set; }
    }
}
