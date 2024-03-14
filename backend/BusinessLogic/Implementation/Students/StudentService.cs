using BusinessLogic.Base;
using BusinessLogic.Implementation.Students.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Implementation.Students
{
    public class StudentService : BaseService
    {
        public StudentService(ServiceDependencies serviceDependencies) : base(serviceDependencies)
        {
        }

        public async Task<List<GetStudentModel>> GetStudents()
        {
            var students = await UnitOfWork.Students.Get()
                .Include(s => s.University)
                .Include(s => s.Domain)
                .Select(s => new GetStudentModel()
                {
                    Name = s.Name,
                    PhoneNumber = s.PhoneNumber,
                    Email = s.Email,
                    DomainId = s.DomainId,
                    Domain = s.Domain.Domain1,
                    UniversityId = s.UniversityId,
                    University = s.University.Name
                })
                .OrderBy(s => s.Name)
                .ToListAsync();

            return students;
        }
    }
}
