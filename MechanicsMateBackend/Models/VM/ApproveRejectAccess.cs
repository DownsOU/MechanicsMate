using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MechanicsMateBackend.Models.VM
{
    public class ApproveRejectAccess
    {
        public int OwnerId { get; set; }
        public int ServiceProviderId { get; set; }

        public string ApproveReject { get; set; }
    }
}
