using TM.Domain.Common;
using TM.Domain.Dtos.Request.TypeTree;
using TM.Domain.Dtos.Response.TypeTree;

namespace TM.Application.Services_Interface
{
    public interface ITypeTreeService
    {
        Task<Result<IEnumerable<TypeTreeRes>>> GetAll();
        Task<Result<IEnumerable<TypeTreeRes>>> FindAll();
        Task<Result<TypeTreeRes>> FindById(string Id);
        Task<Result<TypeTreeRes>> GetById(string Id);
        Task<Result<bool>> CreateAsync(TypeTreeReq typeTree);
        Task<Result<bool>> UpdateAsync(string Id, TypeTreeReq typeTree);
        Task<Result<bool>> SoftDeleteAsync(string Id);
        Task<Result<bool>> DeleteAsync(string Id);
    }
}
