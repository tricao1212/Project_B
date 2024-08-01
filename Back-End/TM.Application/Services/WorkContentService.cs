//using AutoMapper;
//using TM.Application.Common;
//using TM.Application.Services_Interface;
//using TM.Domain.Common;
//using TM.Domain.Dtos.Request.WorkContent;
//using TM.Domain.Dtos.Response.TypeTree;
//using TM.Domain.Dtos.Response.WorkContent;
//using TM.Domain.Repository_Interface;

//namespace TM.Application.Services
//{
//    public class WorkContentService : BaseService, IWorkContentService
//    {
//        public WorkContentService(IUnitOfWork _unitOfWork, IMapper _mapper) : base(_unitOfWork, _mapper)
//        {
//        }
//        public async Task<Result<IEnumerable<WorkContentRes>>> FindAll()
//        {
//            try
//            {
//                var res = await _unitOfWork.WorkContentRepo.FindAllAsync();
//                var resData = _mapper.Map<IEnumerable<WorkContentRes>>(res);
//                return Success(resData);
//            }
//            catch (Exception ex)
//            {
//                return BadRequest<IEnumerable<WorkContentRes>>(ex.Message);
//            }
//        }

//        public async Task<Result<IEnumerable<WorkContentRes>>> GetAll()
//        {
//            try
//            {
//                var res = await _unitOfWork.WorkContentRepo.GetAllAsync();
//                var resData = _mapper.Map<IEnumerable<WorkContentRes>>(res);
//                return Success(resData);
//            }
//            catch (Exception ex)
//            {
//                return BadRequest<IEnumerable<WorkContentRes>>(ex.Message);
//            }
//        }

//        //public Task<Result<WorkContentRes>> FindById(string Id)
//        //{
//        //    throw new NotImplementedException();
//        //}

//        //public Task<Result<WorkContentRes>> GetById(string Id)
//        //{
//        //    throw new NotImplementedException();
//        //}

//        public async Task<Result<bool>> CreateAsync(WorkContentReq content)
//        {
//            try
//            {
//                var existedAssignment = 
//                var newContent = _mapper.Map<WorkContentReq>(content); 
                
//                return Success(resData);
//            }
//            catch (Exception ex)
//            {
//                return BadRequest<IEnumerable<WorkContentRes>>(ex.Message);
//            }
//        }

//        public async Task<Result<bool>> UpdateAsync(string Id, WorkContentReq content)
//        {
//            throw new NotImplementedException();
//        }

//        public async Task<Result<bool>> DeleteAsync(string Id)
//        {
//            throw new NotImplementedException();
//        }

//        public async Task<Result<bool>> SoftDeleteAsync(string Id)
//        {
//            throw new NotImplementedException();
//        }

//    }
//}
