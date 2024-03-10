using Common;
using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public partial class University : IEntity
    {
        public University()
        {
            Students = new HashSet<Student>();
            Users = new HashSet<User>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int MonthBudgetEu { get; set; }
        public int MonthBudgetNonEu { get; set; }
        public decimal AvgGrade { get; set; }

        public virtual ICollection<Student> Students { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
