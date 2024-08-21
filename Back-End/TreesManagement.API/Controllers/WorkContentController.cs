using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TM.Application.Services_Interface;
using TM.Domain.Dtos.Request.WorkContent;

namespace TreesManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkContentController : ControllerBase
    {
        private IWorkContentService _workContentService;
        public WorkContentController(IWorkContentService workContentService)
        {
            _workContentService = workContentService;
        }

        [HttpPut]
        [Route("Update")]
        [Authorize]
        public async Task<IActionResult> Update(string Id, WorkContentReq work)
        {
            var res = await _workContentService.UpdateAsync(Id, work);
            return StatusCode((int)res.StatusCode, res);
        }

    }
}
