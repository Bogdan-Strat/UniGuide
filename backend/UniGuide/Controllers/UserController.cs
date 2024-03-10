using BusinessLogic.Implementation.UserAccount;
using BusinessLogic.Implementation.UserAccount.Models;
using Common.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UniGuide.Code.Base;
//using UniGuide.Code.Utils;

namespace UniGuide.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class UserController : BaseController
    {
        private readonly UserService userService;
        private readonly IConfiguration _configuration;
        private readonly HttpClient Client;
        public UserController(ControllerDependencies dependencies, UserService userService, IConfiguration configuration, HttpClient client) : base(dependencies)
        {
            this.userService = userService;
            _configuration = configuration;
            Client = client;
        }

        [HttpGet("data")]
        //[Authorize]
        public IActionResult GetData()
        {
            return Ok("test");
        }
        //[HttpGet("userAccount")]
        //public async Task<IActionResult> GetUserAccount()
        //{
        //    var result = await userService.GetUserAccount()
        //}
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("model");
            }
            model.Email?.Trim();
            model.Username.Trim();

            await userService.RegisterNewUser(model);

            return Ok();
        }

        [HttpPost("signin")]
        public async Task<IActionResult> Login([FromBody] LogInModel model)
        {
            var user = await userService.Login(model);

            if (!user.IsAuthenticated)
            {
                model.AreCredentialsInvalid = true;
                return Unauthorized();
            }

            var token = LogIn(user);

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo
            });
        }

        [HttpPost("createAccountFromGoogle")]
        public async Task<IActionResult> CreateAccountFromGoogle([FromBody] CreateAccountFromGoogleModel model)
        {
            //if there is not already an account - create account account and login

            
            var user = await userService.LoginAndCreateUserWithGoogleAccount(model);

            if (!user.IsAuthenticated)
            {
                return Unauthorized();
            }

            var token = LogIn(user);

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo
            });
        }

        private JwtSecurityToken LogIn(CurrentUserDTO user)
        {
            var authClaims = new List<Claim>
                {
                    new Claim("Email", user.Email),
                    new Claim("Username", user.Username),
                    //new Claim("Photo", user.Photo),
                    new Claim("Id", user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    //new Claim(ClaimTypes.Role, user.Role),
                };

            var token = GetToken(authClaims);

            return token;
        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(24),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
    }
}
