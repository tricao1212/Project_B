using Microsoft.AspNetCore.Authorization;
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
        [Route("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var res = await _treeService.GetAll();
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpGet]
        [Route("FindAll")]
        public async Task<IActionResult> FindAll()
        {
            var res = await _treeService.FindAll();
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpPost]
        [Route("GetById")]
        public async Task<IActionResult> GetById(string Id)
        {
            var res = await _treeService.GetById(Id);
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpGet]
        [Route("FindById")]
        public async Task<IActionResult> FindById(string Id)
        {
            var res = await _treeService.FindById(Id);
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Create([FromForm] TreeReq tree, IFormFile image)
        {
            var res = await _treeService.CreateAsync(tree,image);
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> Update(string Id, [FromForm] TreeReq tree, IFormFile image)
        {
            var res = await _treeService.UpdateAsync(Id, tree, image);
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpDelete]
        [Route("SoftDelete")]
        public async Task<IActionResult> SoftDelete(string Id)
        {
            var res = await _treeService.SoftDeleteAsync(Id);
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpDelete]
        [Route("Delete")]
        public async Task<IActionResult> DeleteTree(string Id)
        {
            var res = await _treeService.DeleteAsync(Id);
            return StatusCode((int)res.StatusCode,res);
        }
    }
}
