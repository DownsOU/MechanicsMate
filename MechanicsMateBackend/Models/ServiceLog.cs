﻿using System;
using System.Collections.Generic;

namespace MechanicsMateBackend.Models
{
    public partial class ServiceLog
    {
        public int ServiceLogId { get; set; }
        public int ServicerId { get; set; }
        public int? ServiceTypeId { get; set; }
        public int VehicleId { get; set; }
        public string CustomServiceName { get; set; }
        public uint? CustomServiceInterval { get; set; }
        public uint CurrentMileage { get; set; }
        public DateTime ServiceDate { get; set; }
        public string ServiceNotes { get; set; }
        public string InvoicePath { get; set; }

        public virtual ServiceType ServiceType { get; set; }
        public virtual User Servicer { get; set; }
        public virtual Vehicle Vehicle { get; set; }
    }
}