using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MechanicsMateBackend.Models.VM
{
    public class VehicleData
    {
        public int OwnerId { get; set; }
        public ulong VehicleInfoId { get; set; }
        public uint Mileage { get; set; }
        public uint? DrivingHabit { get; set; }
    }
}
