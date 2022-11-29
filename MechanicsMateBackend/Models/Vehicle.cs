using System;
using System.Collections.Generic;

namespace MechanicsMateBackend.Models
{
    public partial class Vehicle
    {
        public Vehicle()
        {
            ServiceLogs = new HashSet<ServiceLog>();
        }

        public int VehicleId { get; set; }
        public int OwnerId { get; set; }
        public ulong VehicleInfoId { get; set; }
        public uint Mileage { get; set; }
        public uint? DrivingHabit { get; set; }
        public string Vin { get; set; }

        public virtual User Owner { get; set; }
        public virtual Mg1nYearMakeModelMasterAdvanced VehicleInfo { get; set; }
        public virtual ICollection<ServiceLog> ServiceLogs { get; set; }
    }
}
