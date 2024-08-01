using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TM.Application.Common;
using TM.Application.Services_Interface;
using TM.Domain.Common;
using TM.Domain.Dtos.Request.TypeTree;
using TM.Domain.Dtos.Response.Tree;
using TM.Domain.Dtos.Response.TypeTree;
using TM.Domain.Entity;
using TM.Domain.Repository_Interface;

namespace TM.Application.Services
{
    public class TypeTreeService : BaseService, ITypeTreeService
    {
        public TypeTreeService(IUnitOfWork _unitOfWork, IMapper _mapper) : base(_unitOfWork, _mapper) { }

        public async Task<Result<IEnumerable<TypeTreeRes>>> FindAll()
        {
            try
            {
                var res = await _unitOfWork.TypeTreeRepo.FindAllAsync();
                var resData = _mapper.Map<IEnumerable<TypeTreeRes>>(res);
                return Success(resData);
            }
            catch (Exception ex)
            {
                return BadRequest<IEnumerable<TypeTreeRes>>(ex.Message);
            }
        }

        public async Task<Result<IEnumerable<TypeTreeRes>>> GetAll()
        {
            try
            {
                var res = await _unitOfWork.TypeTreeRepo.GetAllAsync();
                var resData = _mapper.Map<IEnumerable<TypeTreeRes>>(res);
                return Success(resData);
            }
            catch (Exception ex)
            {
                return BadRequest<IEnumerable<TypeTreeRes>>(ex.Message);
            }
        }

        public async Task<Result<TypeTreeRes>> FindById(string Id)
        {
            try
            {
                var res = await _unitOfWork.TypeTreeRepo.FindByIdAsync(Id);

                if (res == null)
                {
                    return NotFound<TypeTreeRes>("This type is not exist!");
                }

                var resData = _mapper.Map<TypeTreeRes>(res);
                return Success(resData);
            }
            catch (Exception ex)
            {
                return BadRequest<TypeTreeRes>(ex.Message);
            }
        }

        public async Task<Result<TypeTreeRes>> GetById(string Id)
        {
            try
            {
                var res = await _unitOfWork.TypeTreeRepo.GetByIdAsync(Id);

                if (res == null)
                {
                    return NotFound<TypeTreeRes>("This type is not exist!");
                }

                var resData = _mapper.Map<TypeTreeRes>(res);
                return Success(resData);
            }
            catch (Exception ex)
            {
                return BadRequest<TypeTreeRes>(ex.Message);
            }
        }

        public async Task<Result<bool>> CreateAsync(TypeTreeReq typeTree)
        {
            try
            {
                var type = await _unitOfWork.TypeTreeRepo.FindByName(typeTree.Name);

                if (type == null)
                {
                    var newType = _mapper.Map<TypeTree>(typeTree);
                    await _unitOfWork.TypeTreeRepo.CreateAsync(newType);
                    return Success(true);
                }

                return BadRequest<bool>("This type already existed");
            }
            catch (Exception ex)
            {
                return BadRequest<bool>(ex.Message);
            }
        }

        public async Task<Result<bool>> UpdateAsync(string Id, TypeTreeReq typeTree)
        {
            try
            {
                var existedType = await _unitOfWork.TypeTreeRepo.FindByIdAsync(Id);

                if (existedType == null)
                {
                    return NotFound<bool>("This type is not exist!");
                }

                _mapper.Map(typeTree, existedType);

                await _unitOfWork.TypeTreeRepo.UpdateAsync(existedType);
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
                var existedType = await _unitOfWork.TypeTreeRepo.FindByIdAsync(Id);

                if (existedType == null)
                {
                    return NotFound<bool>("This type is not exist!");
                }

                await _unitOfWork.TypeTreeRepo.DeleteAsync(existedType);
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
                var existedType = await _unitOfWork.TypeTreeRepo.FindByIdAsync(Id);

                if (existedType == null)
                {
                    return NotFound<bool>("This type is not exist!");
                }

                await _unitOfWork.TypeTreeRepo.SoftDeleteAsync(existedType);
                return Success(true);
            }
            catch (Exception ex)
            {
                return BadRequest<bool>(ex.Message);
            }
        }
    }
}
