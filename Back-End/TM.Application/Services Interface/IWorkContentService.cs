using TM.Domain.Common;
using TM.Domain.Dtos.Request.TypeTree;
using TM.Domain.Dtos.Request.WorkContent;
using TM.Domain.Dtos.Response.WorkContent;

namespace TM.Application.Services_Interface
{
    public interface IWorkContentService
    {
        Task<Result<IEnumerable<WorkContentRes>>> GetAll();
        Task<Result<IEnumerable<WorkContentRes>>> FindAll();
        //Task<Result<WorkContentRes>> FindById(string Id);
        //Task<Result<WorkContentRes>> GetById(string Id);
        Task<Result<bool>> CreateAsync(WorkContentReq content);
        Task<Result<bool>> UpdateAsync(string Id, WorkContentReq content);
        Task<Result<bool>> SoftDeleteAsync(string Id);
        Task<Result<bool>> DeleteAsync(string Id);
    }
}
