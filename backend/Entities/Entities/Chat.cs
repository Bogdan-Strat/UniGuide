using Common;
using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public partial class Chat : IEntity
    {
        public Chat()
        {
            Users = new HashSet<User>();
        }

        public Guid Id { get; set; }
        public string ThreadId { get; set; } = null!;
        public string Question { get; set; } = null!;
        public string Answer { get; set; } = null!;
        public DateTime Date { get; set; }
        public Guid UserId { get; set; }

        public virtual User User { get; set; } = null!;
        public virtual ICollection<User> Users { get; set; }
    }
}
