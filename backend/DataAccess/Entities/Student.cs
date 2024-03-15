﻿using System;
using System.Collections.Generic;

namespace DataAccess.Entities
{
    public partial class Student
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Email { get; set; } = null!;
        public int DomainId { get; set; }
        public int UniversityId { get; set; }

        public virtual Domain Domain { get; set; } = null!;
        public virtual University University { get; set; } = null!;
    }
}
