using Common;
using DataAccess.Context;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class UnitOfWork
    {
        private readonly UniGuideContext Context;

        public UnitOfWork(UniGuideContext context)
        {
            Context = context;
        }

        private IRepository<User> users;
        public IRepository<User> Users => users ?? (users = new BaseRepository<User>(Context));


        private IRepository<University> universities;
        public IRepository<University> Universities => universities ?? (universities = new BaseRepository<University>(Context));

        private IRepository<Student> students;
        public IRepository<Student> Students => students ?? (students = new BaseRepository<Student>(Context));

        private IRepository<Chat> chats;
        public IRepository<Chat> Chats => chats ?? (chats = new BaseRepository<Chat>(Context));


        public async Task SaveChangesAsync()
        {
            await Context.SaveChangesAsync();
        }
    }
}
