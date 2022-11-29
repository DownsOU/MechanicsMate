using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MechanicsMateBackend.Models
{
   public enum RequestStatus : int
    {
        Pending = 1,
        Accepted = 2,
        Rejected = 3,
    }
}
