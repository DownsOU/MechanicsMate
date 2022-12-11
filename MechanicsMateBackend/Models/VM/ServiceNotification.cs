using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MechanicsMateBackend.Models.VM
{
    public class ServiceNotification
    {
        public string ServiceName { get; set; }
        public long EstimatedMileageRemaining { get; set; }
        public string ServicerEmail { get; set; }
        public string OwnerEmail { get; set; }
    }
}
