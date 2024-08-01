using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TM.Application.Services_Interface;
using TM.Domain.Dtos.Request.TypeTree;

namespace TreesManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeTreeController : ControllerBase
    {
        private ITypeTreeService _typeTreeService;

        public TypeTreeController(ITypeTreeService typeTreeService)
        {
            _typeTreeService = typeTreeService;
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var res = await _typeTreeService.GetAll();
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpPost]
        [Route("GetById")]
        public async Task<IActionResult> GetById(string Id)
        {
            var res = await _typeTreeService.GetById(Id);
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpPost]
        [Route("Add")]
        [Authorize]
        public async Task<IActionResult> Create(TypeTreeReq typeTree)
        {
            var res = await _typeTreeService.CreateAsync(typeTree);
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpPut]
        [Route("Update")]
        [Authorize]
        public async Task<IActionResult> Update(string Id, TypeTreeReq typeTree)
        {
            var res = await _typeTreeService.UpdateAsync(Id, typeTree);
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpDelete]
        [Route("SoftDelete")]
        [Authorize]
        public async Task<IActionResult> SoftDelete(string Id)
        {
            var res = await _typeTreeService.SoftDeleteAsync(Id);
            return StatusCode((int)res.StatusCode, res);
        }

        [HttpDelete]
        [Route("Delete")]
        [Authorize]
        public async Task<IActionResult> DeleteTree(string Id)
        {
            var res = await _typeTreeService.DeleteAsync(Id);
            return StatusCode((int)res.StatusCode, res);
        }
    }
}
