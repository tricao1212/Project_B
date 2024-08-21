using TM.Domain.Common;
using TM.Domain.Dtos.Request.TypeTree;
using TM.Domain.Dtos.Request.WorkContent;
using TM.Domain.Dtos.Response.WorkContent;

namespace TM.Application.Services_Interface
{
    public interface IWorkContentService
    {
        Task<Result<bool>> UpdateAsync(string Id, WorkContentReq content);
    }
}
