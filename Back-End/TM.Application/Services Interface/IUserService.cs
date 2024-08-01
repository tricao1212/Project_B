using TM.Domain.Common;
using TM.Domain.Dtos.Request.User;
using TM.Domain.Dtos.Response.User;

namespace TM.Application.Services_Interface
{
    public interface IUserService
    {
        Task<Result<IEnumerable<UserRes>>> GetAll();
        Task<Result<UserRes>> GetById(string Id);
        Task<Result<bool>> UpdateAsync(string Id, UpdateUserReq user);
        Task<Result<bool>> Register(RegisterReq user);
        Task<Result<bool>> SoftDeleteAsync(string Id);
        Task<Result<bool>> DeleteAsync(string Id);
        Task<Result<LoginRes>> Login(LoginReq login);
    }
}
