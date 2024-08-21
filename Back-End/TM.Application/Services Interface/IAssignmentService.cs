using TM.Domain.Common;
using TM.Domain.Dtos.Request.Assignment;
using TM.Domain.Dtos.Response.Assignment;

namespace TM.Application.Services_Interface
{
    public interface IAssignmentService
    {
        Task<Result<IEnumerable<AssignmentRes>>> GetAll();
        Task<Result<IEnumerable<AssignmentRes>>> GetHistory();
        Task<Result<AssignmentRes>> GetById(string Id);
        Task<Result<bool>> CreateAsync(AssignmentReq assignment);
        Task<Result<bool>> RequestConfirm(string Id);
        Task<Result<bool>> UpdateAsync(string Id, AssignmentReq assignment);
        Task<Result<bool>> SoftDeleteAsync(string Id);
        Task<Result<bool>> DeleteAsync(string Id);
        
    }
}
