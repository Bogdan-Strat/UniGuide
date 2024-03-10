using Common;
using DataAccess.Context;
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

        //private IRepository<User> users;
        //public IRepository<User> Users => users ?? (users = new BaseRepository<User>(Context));

        
        public async Task SaveChangesAsync()
        {
            await Context.SaveChangesAsync();
        }
    }
}
