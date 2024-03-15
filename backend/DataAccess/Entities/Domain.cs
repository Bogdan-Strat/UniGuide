using System;
using System.Collections.Generic;

namespace DataAccess.Entities
{
    public partial class Domain
    {
        public Domain()
        {
            Students = new HashSet<Student>();
        }

        public int Id { get; set; }
        public string Domain1 { get; set; } = null!;

        public virtual ICollection<Student> Students { get; set; }
    }
}
