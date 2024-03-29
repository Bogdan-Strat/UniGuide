﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Implementation.UserAccount.Models
{
    public class RegisterModel
    {
        public string Email { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string PhoneNumber { get; set; }

        public string Password { get; set; } = null!;
        public string ConfirmedPassword { get; set; } = null!;
    }
}
