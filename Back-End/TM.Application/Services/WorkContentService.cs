using AutoMapper;
using TM.Application.Common;
using TM.Application.Services_Interface;
using TM.Domain.Common;
using TM.Domain.Dtos.Request.WorkContent;
using TM.Domain.Dtos.Response.TypeTree;
using TM.Domain.Dtos.Response.WorkContent;
using TM.Domain.Repository_Interface;

namespace TM.Application.Services
{
    public class WorkContentService : BaseService, IWorkContentService
    {
        public WorkContentService(IUnitOfWork _unitOfWork, IMapper _mapper) : base(_unitOfWork, _mapper)
        {
        }

        public async Task<Result<bool>> UpdateAsync(string Id, WorkContentReq content)
        {
            var workExist = await _unitOfWork.WorkContentRepo.GetByIdAsync(Id);
            if (workExist == null)
            {
                return NotFound<bool>("Work not found !");
            }

            _mapper.Map(content, workExist);
            try
            {
                await _unitOfWork.WorkContentRepo.UpdateAsync(workExist);
                return Success(true);
            }
            catch (Exception ex)
            {
                return BadRequest<bool>(ex.Message);
            }
        }
    }
}
