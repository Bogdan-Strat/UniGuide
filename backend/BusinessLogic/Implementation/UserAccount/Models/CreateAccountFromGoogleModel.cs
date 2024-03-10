using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Implementation.UserAccount.Models
{
    public class CreateAccountFromGoogleModel
    {
        public string GoogleId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string? Photo { get; set; }
    }
}
