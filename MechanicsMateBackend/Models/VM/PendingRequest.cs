using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MechanicsMateBackend.Models.VM
{
    public class PendingRequest
    {
        public int ServiceProviderId { get; set; }
        public int VehicleOwnerID { get; set; }
        public string ServiceProviderName { get; set; }
    }
}
