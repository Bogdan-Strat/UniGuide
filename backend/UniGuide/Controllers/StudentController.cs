using BusinessLogic.Implementation.Students;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UniGuide.Code.Base;

namespace UniGuide.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]

    public class StudentController : BaseController
    {
        private readonly StudentService _service;

        public StudentController(ControllerDependencies dependencies, StudentService service) : base(dependencies)
        {
            _service = service;
        }

        [HttpGet("getStudents")]
        public async Task<IActionResult> GetStudents()
        {
            var students = await _service.GetStudents();

            return Ok(students);
        }
    }
}
