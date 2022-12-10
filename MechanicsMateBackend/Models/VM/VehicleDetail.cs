using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MechanicsMateBackend.Models.VM
{
    public class VehicleDetail
    {

        public ulong YmmId { get; set; }

        public string Make { get; set; }

        public string Model { get; set; }

        public string Year { get; set; }

        public string Engine { get; set; }

        public string EngineLiterDisplay { get; set; }

        public string Submodel { get; set; }

        public string Trim { get; set; }

        public string Body { get; set; }

        public string VehicleDisplayName { get; set; }
    }
}
