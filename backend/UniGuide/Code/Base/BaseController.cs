using Common.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace UniGuide.Code.Base
{
    public class BaseController : Controller
    {
        protected readonly CurrentUserDTO CurrentUser;

        public BaseController(ControllerDependencies dependencies)
            : base()
        {
            CurrentUser = dependencies.CurrentUser;
        }
    }
}
