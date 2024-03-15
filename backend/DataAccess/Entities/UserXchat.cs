using System;
using System.Collections.Generic;

namespace DataAccess.Entities
{
    public partial class UserXchat
    {
        public Guid UserId { get; set; }
        public Guid ChatId { get; set; }
    }
}
