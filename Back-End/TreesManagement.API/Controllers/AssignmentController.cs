using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TM.Application.Services;
using TM.Application.Services_Interface;
using TM.Domain.Dtos.Request.Assignment;
using TM.Domain.Dtos.Request.Tree;
using TM.Domain.Dtos.Request.TypeTree;

namespace TreesManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentController : ControllerBase
    {
        private IAssignmentService _assignmentService;
        public AssignmentController(IAssignmentService assignmentService)
        {
            _assignmentService = assignmentService;
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var res = await _assignmentService.GetAll();
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpPost]
        [Route("GetById")]
        public async Task<IActionResult> GetById(string Id)
        {
            var res = await _assignmentService.GetById(Id);
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpPost]
        [Route("Add")]
        [Authorize(Roles = "Admin, Manager")]
        public async Task<IActionResult> Create(AssignmentReq asignment)
        {
            var res = await _assignmentService.CreateAsync(asignment);
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpPut]
        [Route("Update")]
        [Authorize]
        public async Task<IActionResult> Update(string Id, AssignmentReq asignment)
        {
            var res = await _assignmentService.UpdateAsync(Id, asignment);
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpDelete]
        [Route("SoftDelete")]
        [Authorize(Roles = "Admin, Manager")]
        public async Task<IActionResult> SoftDelete(string Id)
        {
            var res = await _assignmentService.SoftDeleteAsync(Id);
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpDelete]
        [Route("Delete")]
        [Authorize(Roles = "Admin, Manager")]
        public async Task<IActionResult> DeleteTree(string Id)
        {
            var res = await _assignmentService.DeleteAsync(Id);
            return StatusCode((int)res.StatusCode, res);
        }
    }
}
