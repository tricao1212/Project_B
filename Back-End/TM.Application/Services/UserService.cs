using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TM.Application.Common;
using TM.Application.Services_Interface;
using TM.Domain.Common;
using TM.Domain.Dtos.Request.User;
using TM.Domain.Dtos.Response.User;
using TM.Domain.Entity;
using TM.Domain.Repository_Interface;

namespace TM.Application.Services
{
    public class UserService : BaseService, IUserService
    {
        private readonly IConfiguration _configuration;
        public UserService(IUnitOfWork _unitOfWork, IMapper _mapper, IConfiguration configuration) : base(_unitOfWork, _mapper)
        {
            _configuration = configuration;
        }

        public Task<Result<bool>> DeleteAsync(string UserName)
        {
            throw new NotImplementedException();
        }

        public async Task<Result<IEnumerable<UserRes>>> GetAll()
        {
            try
            {
                var users = await _unitOfWork.UserRepo.GetAllAsync();
                var res = _mapper.Map<IEnumerable<UserRes>>(users);
                return Success(res);
            }
            catch (Exception ex)
            {
                return BadRequest<IEnumerable<UserRes>>(ex.Message);
            }
        }

        public Task<Result<UserRes>> GetById(string UserName)
        {
            throw new NotImplementedException();
        }

        public async Task<Result<LoginRes>> Login(LoginReq login)
        {
            var userExist = await _unitOfWork.UserRepo.GetByUserName(login.UserName);
            if (userExist == null)
            {
                return NotFound<LoginRes>("User name or password is not correct!");
            }

            bool checkPass = BCrypt.Net.BCrypt.Verify(login.Password, userExist.Password);
            if (checkPass)
            {
                var userRes = _mapper.Map<UserRes>(userExist);
                var loginInfo = new LoginRes(GenerateJWTToken(userExist), userRes);
                return Success(loginInfo);
            }

            return BadRequest<LoginRes>("User name or password is not correct!");
        }

        public string GenerateJWTToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.UserData, user.UserName),
                new Claim(ClaimTypes.Name, user.FullName),
            };
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(double.Parse(_configuration["Jwt:Expires"])),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<Result<bool>> Register(RegisterReq user)
        {
            var userExist = await _unitOfWork.UserRepo.GetByUserName(user.UserName);
            if (userExist == null)
            {
                try
                {
                    user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                    var userReq = _mapper.Map<User>(user);
                    await _unitOfWork.UserRepo.CreateAsync(userReq);
                    return Success(true);
                }
                catch (Exception ex)
                {
                    return BadRequest<bool>(ex.Message);
                }
            }

            return BadRequest<bool>("User already exist");
        }

        public Task<Result<bool>> SoftDeleteAsync(string UserName)
        {
            throw new NotImplementedException();
        }
    }
}
