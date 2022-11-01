using System;
using System.Collections.Generic;

namespace MechanicsMateBackend.Models
{
    /// <summary>
    /// Year Make Model Master Table
    /// </summary>
    public partial class Mg1nYearMakeModelMasterAdvanced
    {
        public Mg1nYearMakeModelMasterAdvanced()
        {
            Vehicles = new HashSet<Vehicle>();
        }

        /// <summary>
        /// YMM ID
        /// </summary>
        public ulong YmmId { get; set; }
        /// <summary>
        /// Make
        /// </summary>
        public string Make { get; set; }
        /// <summary>
        /// Model
        /// </summary>
        public string Model { get; set; }
        /// <summary>
        /// Year
        /// </summary>
        public string Year { get; set; }
        /// <summary>
        /// Engine
        /// </summary>
        public string Engine { get; set; }
        /// <summary>
        /// Engine_Liter_Display
        /// </summary>
        public string EngineLiterDisplay { get; set; }
        /// <summary>
        /// Submodel
        /// </summary>
        public string Submodel { get; set; }
        /// <summary>
        /// Trim
        /// </summary>
        public string Trim { get; set; }
        /// <summary>
        /// Body
        /// </summary>
        public string Body { get; set; }
        /// <summary>
        /// Vehicle_Display_Name
        /// </summary>
        public string VehicleDisplayName { get; set; }

        public virtual ICollection<Vehicle> Vehicles { get; set; }
    }
}
