using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        private readonly IWebHostEnvironment _environment;
        public TreeService(IUnitOfWork _unitOfWork, IMapper _mapper, IWebHostEnvironment environment) : base(_unitOfWork, _mapper)
        {
            _environment = environment;
        }

        public async Task<Result<IEnumerable<TreeRes>>> FindAll()
        {
            try
            {
                var res = await _unitOfWork.TreeRepo.FindAllAsync();
                var resData = _mapper.Map<IEnumerable<TreeRes>>(res);
                return Success(resData);
            }
            catch (Exception ex)
            {
                return BadRequest<IEnumerable<TreeRes>>(ex.Message);
            }
        }

        public async Task<Result<IEnumerable<TreeRes>>> GetAll()
        {
            try
            {
                var res = await _unitOfWork.TreeRepo.GetAllAsync();
                var resData = _mapper.Map<IEnumerable<TreeRes>>(res);
                return Success(resData);
            }
            catch (Exception ex)
            {
                return BadRequest<IEnumerable<TreeRes>>(ex.Message);
            }
        }

        public async Task<Result<TreeRes>> FindById(string Id)
        {
            try
            {
                var res = await _unitOfWork.TreeRepo.FindByIdAsync(Id);

                if(res == null)
                {
                    return NotFound<TreeRes>("This tree is not exist!");
                }

                var resData = _mapper.Map<TreeRes>(res);
                return Success(resData);
            }
            catch (Exception ex)
            {
                return BadRequest<TreeRes>(ex.Message);
            }
        }

        public async Task<Result<TreeRes>> GetById(string Id)
        {
            try
            {
                var res = await _unitOfWork.TreeRepo.GetByIdAsync(Id);

                if (res == null)
                {
                    return NotFound<TreeRes>("This tree is not exist!");
                }

                var resData = _mapper.Map<TreeRes>(res);
                return Success(resData);
            }
            catch (Exception ex)
            {
                return BadRequest<TreeRes>(ex.Message);
            }
        }

        public async Task<Result<bool>> CreateAsync([FromForm] TreeReq tree, IFormFile imageFile)
        {
            try
            {
                var imagePath = await SaveImageAsync(imageFile);
                var treeEntity = _mapper.Map<Tree>(tree);
                treeEntity.Image = imagePath;

                treeEntity.Position = new Position
                {
                    Lat = tree.Lat,
                    Lng = tree.Lng,
                };


                var typeTree = await _unitOfWork.TypeTreeRepo.FindByName(tree.TypeTree);

                if (typeTree == null)
                {
                    typeTree = new TypeTree
                    {
                        Name = tree.TypeTree
                    };
                    await _unitOfWork.TypeTreeRepo.CreateAsync(typeTree);
                }

                treeEntity.TreeCode = await _unitOfWork.TreeRepo.GenerateUniqueTreeCode();
                treeEntity.TypeTree = typeTree;

                await _unitOfWork.TreeRepo.CreateAsync(treeEntity);
                return Success(true);
            }
            catch (Exception ex)
            {
                return BadRequest<bool>(ex.Message);
            }
        }

        public async Task<Result<bool>> UpdateAsync(string Id, [FromForm] TreeReq tree, IFormFile imageFile)
        {
            try
            {
                var existingTree = await _unitOfWork.TreeRepo.FindByIdAsync(Id);

                if (existingTree == null)
                    return NotFound<bool>("Tree not found");

                if (imageFile != null)
                {
                    DeleteImage(existingTree.Image);
                    var newImagePath = await SaveImageAsync(imageFile);
                    existingTree.Image = newImagePath;
                }

                existingTree.Position.Lat = tree.Lat;
                existingTree.Position.Lng = tree.Lng;

                var typeTree = await _unitOfWork.TypeTreeRepo.FindByName(tree.TypeTree);
                if (typeTree == null)
                {
                    typeTree = new TypeTree
                    {
                        Name = tree.TypeTree
                    };
                    await _unitOfWork.TypeTreeRepo.CreateAsync(typeTree);
                }
                existingTree.TypeTree = typeTree;

                _mapper.Map(tree, existingTree);

                await _unitOfWork.TreeRepo.UpdateAsync(existingTree);

                return Success(true);
            }
            catch (Exception ex)
            {
                return BadRequest<bool>(ex.Message);
            }
        }

        public async Task<Result<bool>> DeleteAsync(string Id)
        {
            var tree = await _unitOfWork.TreeRepo.FindByIdAsync(Id);

            if (tree == null)
            {
                return NotFound<bool>("This tree is not exist!");
            }

            try
            {
                DeleteImage(tree.Image);
                await _unitOfWork.TreeRepo.DeleteAsync(tree);
                return Success(true);
            }
            catch (Exception ex)
            {
                return BadRequest<bool>(ex.Message);
            }
        }

        public async Task<Result<bool>> SoftDeleteAsync(string Id)
        {
            var tree = await _unitOfWork.TreeRepo.FindByIdAsync(Id);

            if (tree == null)
            {
                return NotFound<bool>("This tree is not exist!");
            }

            try
            {
                await _unitOfWork.TreeRepo.SoftDeleteAsync(tree);
                return Success(true);
            }
            catch (Exception ex)
            {
                return BadRequest<bool>(ex.Message);
            }
        }

        private async Task<string> SaveImageAsync(IFormFile image)
        {
            if (image == null || image.Length == 0)
                throw new ArgumentException("No image provided");

            var uploadsFolder = Path.Combine(_environment.ContentRootPath, "uploads");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = Guid.NewGuid().ToString() + "_" + image.FileName;
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(fileStream);
            }

            return uniqueFileName;
        }

        private void DeleteImage(string imagePath)
        {
            if (!string.IsNullOrEmpty(imagePath))
            {
                var filePath = Path.Combine(_environment.ContentRootPath, "uploads", imagePath);
                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }
            }
        }
    }
}
