using System;
using System.Collections.Generic;

namespace DataAccess.Entities
{
    public partial class University
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
        public string Location { get; set; } = null!;

        public virtual ICollection<Student> Students { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
