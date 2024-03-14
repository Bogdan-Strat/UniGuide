using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Implementation.Chats.Models
{
    public class SaveChatModel
    {
        public string ThreadId { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
    }
}
