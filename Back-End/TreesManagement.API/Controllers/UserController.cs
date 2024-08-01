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
        public async Task<IActionResult> Register([FromBody] RegisterReq register)
        {
            var res = await _userService.Register(register);
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpPost]
        [Route("GetById")]
        public async Task<IActionResult> GetById(string Id)
        {
            var res = await _userService.GetById(Id);
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> Update(string Id, UpdateUserReq user)
        {
            var res = await _userService.UpdateAsync(Id, user);
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpDelete]
        [Route("Delete")]
        public async Task<IActionResult> Delete(string Id)
        {
            var res = await _userService.DeleteAsync(Id);
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpDelete]
        [Route("SoftDelete")]
        public async Task<IActionResult> SoftDelete(string Id)
        {
            var res = await _userService.SoftDeleteAsync(Id);
            return StatusCode((int)res.StatusCode, res);
        }
    }
}
