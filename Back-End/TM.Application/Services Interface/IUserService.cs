using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TM.Domain.Common;
using TM.Domain.Dtos.Request.Tree;
using TM.Domain.Dtos.Request.User;
using TM.Domain.Dtos.Response.Tree;
using TM.Domain.Dtos.Response.User;

namespace TM.Application.Services_Interface
{
    public interface IUserService
    {
        Task<Result<IEnumerable<UserRes>>> GetAll();
        Task<Result<UserRes>> GetById(string UserName);
        Task<Result<bool>> Register(RegisterReq user);
        Task<Result<bool>> SoftDeleteAsync(string UserName);
        Task<Result<bool>> DeleteAsync(string UserName);
        Task<Result<LoginRes>> Login(LoginReq login);
    }
}
