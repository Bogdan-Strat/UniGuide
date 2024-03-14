using BusinessLogic.Base;
using BusinessLogic.Implementation.Chats.Models;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Implementation.Chats
{
    public class ChatService : BaseService
    {
        public ChatService(ServiceDependencies serviceDependencies) : base(serviceDependencies)
        {
        }

        public async Task<List<GetChatModel>> GetChats()
        {
            var chats = await UnitOfWork.Chats.Get()
                .Where(c => c.UserId == CurrentUser.Id)
                .Select(c => new GetChatModel()
                {
                    ThreadId = c.ThreadId,
                    Title = c.Question,
                    Message = c.Answer,
                    Date = c.Date
                })
                .OrderByDescending(c => c.Date)
                .ToListAsync();

            return chats;
        }

        public async Task SaveChat(SaveChatModel model)
        {
            var chat = new Chat()
            {
                Id = Guid.NewGuid(),
                ThreadId = model.ThreadId,
                Answer = model.Answer,
                Question = model.Question,
                Date = DateTime.Now,
                UserId = CurrentUser.Id,
            };

            UnitOfWork.Chats.Insert(chat);

            await UnitOfWork.SaveChangesAsync();


        }
    }
}
