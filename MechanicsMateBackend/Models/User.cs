using System;
using System.Collections.Generic;

namespace MechanicsMateBackend.Models
{
    public partial class User
    {
        public User()
        {
            ServiceLogs = new HashSet<ServiceLog>();
            UserAccessServiceProviders = new HashSet<UserAccess>();
            UserAccessVehicleOwners = new HashSet<UserAccess>();
            Vehicles = new HashSet<Vehicle>();
        }

        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string UserType { get; set; }

        public virtual ICollection<ServiceLog> ServiceLogs { get; set; }
        public virtual ICollection<UserAccess> UserAccessServiceProviders { get; set; }
        public virtual ICollection<UserAccess> UserAccessVehicleOwners { get; set; }
        public virtual ICollection<Vehicle> Vehicles { get; set; }
    }
}
