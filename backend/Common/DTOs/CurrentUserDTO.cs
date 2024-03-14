using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTOs
{
    public class CurrentUserDTO
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public bool IsAuthenticated { get; set; }
        public bool IsFirstTime { get; set; }
        public string HomeCountry { get; set; }
        public int Budget { get; set; }
        public decimal Grade { get; set; }

        public static implicit operator Guid(CurrentUserDTO v)
        {
            throw new NotImplementedException();
        }
    }
}
