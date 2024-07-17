using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TM.Application.Services_Interface;
using TM.Domain.Dtos.Request.User;

namespace TreesManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("All")]
        [Authorize]
        public async Task<IActionResult> GetAllUsers()
        {
            var res = await _userService.GetAll();
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginReq login)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors)
                                               .Select(e => e.ErrorMessage)
                                               .ToList();
                return BadRequest(new { Message = "Validation failed", Errors = errors });
            }
            var res = await _userService.Login(login);
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterReq register)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors)
                                               .Select(e => e.ErrorMessage)
                                               .ToList();
                return BadRequest(new { Message = "Validation failed", Errors = errors });
            }
            var res = await _userService.Register(register);
            return StatusCode((int)res.StatusCode, res);
        }
    }
}
