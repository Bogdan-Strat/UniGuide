using BusinessLogic.Implementation.Universities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UniGuide.Code.Base;

namespace UniGuide.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]

    public class UniversityController : BaseController
    {
        private readonly UniversityService _service;

        public UniversityController(ControllerDependencies dependencies, UniversityService service) : base(dependencies)
        {
            _service = service;
        }

        [HttpGet("getUniversities")]
        public async Task<IActionResult> GetUniversities()
        {
            var universities = await _service.GetUniversities();

            return Ok(universities);
        }
    }
}
