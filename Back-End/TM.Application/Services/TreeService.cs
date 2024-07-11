using AutoMapper;
using TM.Application.Common;
using TM.Application.Services_Interface;
using TM.Domain.Common;
using TM.Domain.Dtos.Request.Tree;
using TM.Domain.Dtos.Response.Tree;
using TM.Domain.Entity;
using TM.Domain.Repository_Interface;

namespace TM.Application.Services
{
    public class TreeService : BaseService, ITreeService
    {
        public TreeService(IUnitOfWork _unitOfWork, IMapper _mapper) : base(_unitOfWork, _mapper)
        {

        }

        public async Task<Result<bool>> CreateAsync(CreateTreeReq tree)
        {
            try
            {
                var treeEntity = _mapper.Map<Tree>(tree);
                await _unitOfWork.TreeRepo.CreateAsync(treeEntity);
                return Success(true);
            }
            catch (Exception ex)
            {
                return BadRequest<bool>(ex.Message);
            }
        }

        public Task<Result<bool>> DeleteAsync(string Id)
        {
            throw new NotImplementedException();
        }

        public async Task<Result<IEnumerable<GetTreeRes>>> GetAll()
        {
            try
            {
                var res = await _unitOfWork.TreeRepo.GetAllAsync();
                var resData = _mapper.Map<IEnumerable<GetTreeRes>>(res);
                return Success(resData);
            }
            catch (Exception ex)
            {
                return BadRequest<IEnumerable<GetTreeRes>>(ex.Message);
            }
        }

        public Task<Result<GetTreeRes>> GetById(string Id)
        {
            throw new NotImplementedException();
        }

        public Task<Result<bool>> SoftDeleteAsync(string Id)
        {
            throw new NotImplementedException();
        }

        public Task<Result<bool>> UpdateAsync(UpdateTreeReq tree)
        {
            throw new NotImplementedException();
        }
    }
}
