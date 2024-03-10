using Common;
using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public partial class Domain : IEntity
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
