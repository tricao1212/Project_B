using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TM.Application.Common;
using TM.Application.Services_Interface;
using TM.Domain.Common;
using TM.Domain.Dtos.Request.Assignment;
using TM.Domain.Dtos.Response.Assignment;
using TM.Domain.Entity;
using TM.Domain.Repository_Interface;

namespace TM.Application.Services
{
    public class AssignmentService : BaseService, IAssignmentService
    {
        public AssignmentService(IUnitOfWork _unitOfWork, IMapper _mapper) : base(_unitOfWork, _mapper)
        {
        }

        public async Task<Result<IEnumerable<AssignmentRes>>> FindAll()
        {
            try
            {
                var res = await _unitOfWork.AssignmentRepo.FindAllAsync();
                var resData = _mapper.Map<IEnumerable<AssignmentRes>>(res);
                return Success(resData);
            }
            catch (Exception ex)
            {
                return BadRequest<IEnumerable<AssignmentRes>>(ex.Message);
            }
        }

        public async Task<Result<IEnumerable<AssignmentRes>>> GetAll()
        {
            try
            {
                var res = await _unitOfWork.AssignmentRepo.GetAllAsync();
                var resData = _mapper.Map<IEnumerable<AssignmentRes>>(res);
                return Success(resData);
            }
            catch (Exception ex)
            {
                return BadRequest<IEnumerable<AssignmentRes>>(ex.Message);
            }
        }

        public async Task<Result<AssignmentRes>> FindById(string Id)
        {
            try
            {
                var res = await _unitOfWork.AssignmentRepo.FindByIdAsync(Id);

                if(res == null)
                {
                    return NotFound<AssignmentRes>("Assignment not found!");
                }

                var resData = _mapper.Map<AssignmentRes>(res);
                return Success(resData);
            }
            catch (Exception ex)
            {
                return BadRequest<AssignmentRes>(ex.Message);
            }
        }

        public async Task<Result<AssignmentRes>> GetById(string Id)
        {
            try
            {
                var res = await _unitOfWork.AssignmentRepo.GetByIdAsync(Id);

                if (res == null)
                {
                    return NotFound<AssignmentRes>("Assignment not found!");
                }

                var resData = _mapper.Map<AssignmentRes>(res);
                return Success(resData);
            }
            catch (Exception ex)
            {
                return BadRequest<AssignmentRes>(ex.Message);
            }
        }

        public async Task<Result<bool>> CreateAsync(AssignmentReq assignment)
        {
            try
            {
                var treeExist = await _unitOfWork.TreeRepo.FindByIdAsync(assignment.TreeId);
                var userExist = await _unitOfWork.UserRepo.FindByIdAsync(assignment.UserId);

                if(treeExist == null)
                {
                    return NotFound<bool>("This tree is not exist!");
                }

                if (userExist == null)
                {
                    return NotFound<bool>("This user is not exist!");
                }

                var newAssignment = _mapper.Map<Assignment>(assignment);
                await _unitOfWork.AssignmentRepo.CreateAsync(newAssignment);
                return Success(true);
            }
            catch (Exception ex)
            {
                return BadRequest<bool>(ex.Message);
            }
        }
        
        public async Task<Result<bool>> UpdateAsync(string Id, AssignmentReq assignment)
        {
            try
            {
                var assignExist = await _unitOfWork.AssignmentRepo.FindByIdAsync(Id);
                if(assignExist == null)
                {
                    return NotFound<bool>("Assignment not found!");
                }

                var treeExist = await _unitOfWork.TreeRepo.FindByIdAsync(assignment.TreeId);
                var userExist = await _unitOfWork.UserRepo.FindByIdAsync(assignment.UserId);

                if (treeExist == null)
                {
                    return NotFound<bool>("This tree is not exist!");
                }

                if (userExist == null)
                {
                    return NotFound<bool>("This user is not exist!");
                }

                assignExist.UserId = assignment.UserId;
                assignExist.TreeId = assignment.TreeId;

                var workContentIdsToKeep = assignment.WorkContent.Select(w => w.Id).ToList();
                var workContentsToRemove = assignExist.WorkContent
                    .Where(w => !workContentIdsToKeep.Contains(w.Id))
                    .ToList();

                foreach (var workContent in workContentsToRemove)
                {
                    assignExist.WorkContent.Remove(workContent);
                    await _unitOfWork.WorkContentRepo.DeleteAsync(workContent);
                }

                // Update existing work contents and add new ones
                foreach (var workContentReq in assignment.WorkContent)
                {
                    var existingWorkContent = assignExist.WorkContent
                        .FirstOrDefault(w => w.Id == workContentReq.Id);

                    if (existingWorkContent != null)
                    {
                        // Update existing work content
                        _mapper.Map(workContentReq, existingWorkContent);
                    }
                    else
                    {
                        // Add new work content
                        var newWorkContent = _mapper.Map<WorkContent>(workContentReq);
                        newWorkContent.AssignmentId = assignExist.Id;
                        assignExist.WorkContent.Add(newWorkContent);
                    }
                }

                await _unitOfWork.AssignmentRepo.UpdateAsync(assignExist);
                return Success(true);
            }
            catch (Exception ex)
            {
                return BadRequest<bool>(ex.Message);
            }
        }

        public async Task<Result<bool>> DeleteAsync(string Id)
        {
            try
            {
                var existedAssign = await _unitOfWork.AssignmentRepo.FindByIdAsync(Id);

                if (existedAssign == null)
                {
                    return NotFound<bool>("This assignment is not exist!");
                }

                await _unitOfWork.AssignmentRepo.DeleteAsync(existedAssign);
                return Success(true);
            }
            catch (Exception ex)
            {
                return BadRequest<bool>(ex.Message);
            }
        }

        public async Task<Result<bool>> SoftDeleteAsync(string Id)
        {
            try
            {
                var existedAssign = await _unitOfWork.AssignmentRepo.FindByIdAsync(Id);

                if (existedAssign == null)
                {
                    return NotFound<bool>("This assignment is not exist!");
                }

                await _unitOfWork.AssignmentRepo.SoftDeleteAsync(existedAssign);
                return Success(true);
            }
            catch (Exception ex)
            {
                return BadRequest<bool>(ex.Message);
            }
        }
    }
}
