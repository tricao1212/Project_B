using TM.Domain.Common;
using TM.Domain.Dtos.Request.Tree;
using TM.Domain.Dtos.Response.Tree;

namespace TM.Application.Services_Interface
{
    public interface ITreeService
    {
        Task<Result<IEnumerable<GetTreeRes>>> GetAll();
        Task<Result<GetTreeRes>> GetById(string Id);
        Task<Result<bool>> CreateAsync(CreateTreeReq tree);
        Task<Result<bool>> UpdateAsync(UpdateTreeReq tree);
        Task<Result<bool>> SoftDeleteAsync(string Id);
        Task<Result<bool>> DeleteAsync(string Id);
    }
}
