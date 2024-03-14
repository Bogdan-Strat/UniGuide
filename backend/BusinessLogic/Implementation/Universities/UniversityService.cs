using BusinessLogic.Base;
using BusinessLogic.Implementation.Universities.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Implementation.Universities
{
    public class UniversityService : BaseService
    {
        public UniversityService(ServiceDependencies serviceDependencies) : base(serviceDependencies)
        {
        }

        public async Task<List<GetUniversityModel>> GetUniversities()
        {
            var universities = await UnitOfWork.Universities.Get()
                .Select(u => new GetUniversityModel()
                {
                    Name = u.Name,
                    Location = u.Location
                })
                .OrderBy(U => U.Name)
                .ToListAsync();

            return universities;
        }
    }
}
