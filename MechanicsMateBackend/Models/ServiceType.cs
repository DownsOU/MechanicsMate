using System;
using System.Collections.Generic;

namespace MechanicsMateBackend.Models
{
    public partial class ServiceType
    {
        public ServiceType()
        {
            ServiceLogs = new HashSet<ServiceLog>();
        }

        public int ServiceTypeId { get; set; }
        public string ServiceName { get; set; }
        public uint? ServiceInterval { get; set; }

        public virtual ICollection<ServiceLog> ServiceLogs { get; set; }
    }
}
