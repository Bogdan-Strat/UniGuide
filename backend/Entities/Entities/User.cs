using Common;
using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public partial class User : IEntity
    {
        public User()
        {
            Chats = new HashSet<Chat>();
            Universities = new HashSet<University>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string HomeUniversity { get; set; } = null!;
        public int Budget { get; set; }
        public decimal AvgGrade { get; set; }
        public bool IsEu { get; set; }
        public bool? IsFirstTime { get; set; }
        public decimal Balance { get; set; }
        public string HashedPassword { get; set; } = null!;

        public virtual ICollection<Chat> Chats { get; set; }
        public virtual ICollection<University> Universities { get; set; }
    }
}
