using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Implementation.Students.Model
{
    public class GetStudentModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int DomainId { get; set; }
        public string Domain { get; set; }
        public int UniversityId { get; set; }
        public string University { get; set; }
    }
}
