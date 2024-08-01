using Microsoft.AspNetCore.Http;
using TM.Domain.Common;
using TM.Domain.Dtos.Request.Tree;
using TM.Domain.Dtos.Response.Tree;

namespace TM.Application.Services_Interface
{
    public interface ITreeService
    {
        Task<Result<IEnumerable<TreeRes>>> GetAll();
        Task<Result<TreeRes>> GetById(string Id);
        Task<Result<bool>> CreateAsync(TreeReq tree, IFormFile image);
        Task<Result<bool>> UpdateAsync(string Id, TreeReq tree, IFormFile image);
        Task<Result<bool>> SoftDeleteAsync(string Id);
        Task<Result<bool>> DeleteAsync(string Id);
    }
}
