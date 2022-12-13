using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MechanicsMateBackend.Models.VM
{
    public class AccessRequest
    {
        public int RequestorUserId { get; set; }
        public string RequestedUserEmail { get; set; }
    }
}
