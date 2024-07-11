using Microsoft.AspNetCore.Mvc;
using TM.Application.Services_Interface;
using TM.Domain.Common;
using TM.Domain.Dtos.Request.Tree;
using TM.Domain.Entity;

namespace TreesManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TreeController : ControllerBase
    {
        private ITreeService _treeService;
        public TreeController(ITreeService treeService)
        {
            _treeService = treeService;
        }

        [HttpGet]
        [Route("All")]
        public async Task<IActionResult> GetAllTrees()
        {
            var res = await _treeService.GetAll();
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> CreateTree([FromBody] CreateTreeReq tree)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors)
                                               .Select(e => e.ErrorMessage)
                                               .ToList();
                return BadRequest(new { Message = "Validation failed", Errors = errors });
            }
            var res = await _treeService.CreateAsync(tree);
            return StatusCode((int)res.StatusCode, res);
        }
    }
}
