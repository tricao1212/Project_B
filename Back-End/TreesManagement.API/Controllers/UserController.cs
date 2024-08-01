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
        [Authorize(Roles = "Admin,Manager")]
        public async Task<IActionResult> GetAll()
        {
            var res = await _userService.GetAll();
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginReq login)
        {
            var res = await _userService.Login(login);
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpPost]
        [Route("Register")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Register([FromForm] RegisterReq register, IFormFile image)
        {
            var res = await _userService.Register(register, image);
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpPost]
        [Route("GetById")]
        [Authorize]
        public async Task<IActionResult> GetById(string Id)
        {
            var res = await _userService.GetById(Id);
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpPut]
        [Route("Update")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(string Id, [FromForm] UpdateUserReq user, IFormFile image)
        {
            var res = await _userService.UpdateAsync(Id, user, image);
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpDelete]
        [Route("Delete")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(string Id)
        {
            var res = await _userService.DeleteAsync(Id);
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpDelete]
        [Route("SoftDelete")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> SoftDelete(string Id)
        {
            var res = await _userService.SoftDeleteAsync(Id);
            return StatusCode((int)res.StatusCode, res);
        }
    }
}
