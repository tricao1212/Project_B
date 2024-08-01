using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TM.Domain.Common;
using TM.Domain.Dtos.Request.Assignment;
using TM.Domain.Dtos.Request.Tree;
using TM.Domain.Dtos.Response.Assignment;
using TM.Domain.Dtos.Response.Tree;

namespace TM.Application.Services_Interface
{
    public interface IAssignmentService
    {
        Task<Result<IEnumerable<AssignmentRes>>> GetAll();
        Task<Result<IEnumerable<AssignmentRes>>> FindAll();
        Task<Result<AssignmentRes>> GetById(string Id);
        Task<Result<AssignmentRes>> FindById(string Id);
        Task<Result<bool>> CreateAsync(AssignmentReq assignment);
        Task<Result<bool>> UpdateAsync(string Id, AssignmentReq assignment);
        Task<Result<bool>> SoftDeleteAsync(string Id);
        Task<Result<bool>> DeleteAsync(string Id);
    }
}
