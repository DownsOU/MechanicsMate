using System;
using System.Collections.Generic;

namespace MechanicsMateBackend.Models
{
    public partial class UserAccess
    {
        public int UserAccessId { get; set; }
        public int ServiceProviderId { get; set; }
        public int VehicleOwnerId { get; set; }
        public int RequestStatus { get; set; }

        public virtual User ServiceProvider { get; set; }
        public virtual User VehicleOwner { get; set; }
    }
}
