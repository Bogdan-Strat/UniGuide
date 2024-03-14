using BusinessLogic.Implementation.Chats;
using BusinessLogic.Implementation.Chats.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UniGuide.Code.Base;

namespace UniGuide.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]

    public class ChatController : BaseController
    {
        private readonly ChatService _service;

        public ChatController(ControllerDependencies dependencies, ChatService service) : base(dependencies)
        {
            _service = service;
        }

        [HttpGet("getChats")]
        public async Task<IActionResult> GetChats()
        {
            var chats = await _service.GetChats();

            return Ok(chats);
        }

        [HttpPost("saveChat")]
        public async Task<IActionResult> SaveChat([FromBody] SaveChatModel model)
        {
            await _service.SaveChat(model);

            return Ok();
        }
    }
}
