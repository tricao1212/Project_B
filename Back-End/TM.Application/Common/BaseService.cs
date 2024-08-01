using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using TM.Domain.Common;
using TM.Domain.Repository_Interface;

namespace TM.Application.Common
{
    public abstract class BaseService
    {
        protected readonly IUnitOfWork _unitOfWork;
        protected readonly IMapper _mapper;
        public BaseService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }


        public Result<T> Success<T>(T data)
        {
            return new Result<T>
            {
                StatusCode = HttpStatusCode.OK,
                IsSuccess = true,
                Message = "Successfully",
                Data = data
            };
        }

        public Result<T> BadRequest<T>(string message) 
        {
            return new Result<T>
            {
                StatusCode = HttpStatusCode.BadRequest,
                IsSuccess = false,
                Message = message
            };
        }

        public Result<T> NotFound<T>(string message) 
        {
            return new Result<T>
            {
                StatusCode = HttpStatusCode.NotFound,
                IsSuccess = false,
                Message = message
            };
        }
    }
}
