using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Implementation.UserAccount.Models
{
    public class CreateUniversityReportModel
    {
        public int Id { get; set; }
        public string University { get; set; }
        public bool IsChecked { get; set; }

    }
}
