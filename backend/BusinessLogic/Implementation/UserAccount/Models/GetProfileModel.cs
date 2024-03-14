using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Implementation.UserAccount.Models
{
    public class GetProfileModel
    {
        public string Country { get; set; }
        public int Budget { get; set; }
        public decimal Grade { get; set; }
        public decimal Balance { get; set; }
    }
}
