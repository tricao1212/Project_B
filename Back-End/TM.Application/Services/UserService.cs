using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
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

        public async Task<Result<UserRes>> GetById(string Id)
        {
            try
            {
                var user = await _unitOfWork.UserRepo.GetByIdAsync(Id);

                if (user == null)
                {
                    return NotFound<UserRes>("User is not exist");
                }

                var res = _mapper.Map<UserRes>(user);
                return Success(res);
            }
            catch (Exception ex)
            {
                return BadRequest<UserRes>(ex.Message);
            }
        }

        public async Task<Result<bool>> UpdateAsync(string Id, UpdateUserReq user)
        {
            var userExist = await _unitOfWork.UserRepo.FindByIdAsync(Id);

            if (userExist == null)
            {
                return NotFound<bool>("User is not exist");
            }

            _mapper.Map(user, userExist);

            try
            {
                await _unitOfWork.UserRepo.UpdateAsync(userExist);
                return Success(true);
            }
            catch (Exception ex)
            {
                return BadRequest<bool>(ex.Message);
            }
        }

        public async Task<Result<LoginRes>> Login(LoginReq login)
        {
            var userExist = await _unitOfWork.UserRepo.GetByUserName(login.UserName);
            if (userExist == null)
            {
                return NotFound<LoginRes>("User name is not exist!");
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

        public async Task<Result<bool>> SoftDeleteAsync(string Id)
        {
            var user = await _unitOfWork.UserRepo.FindByIdAsync(Id);

            if (user == null)
            {
                return NotFound<bool>("User is not exist!");
            }

            try
            {
                await _unitOfWork.UserRepo.SoftDeleteAsync(user);
                return Success(true);
            }
            catch (Exception ex)
            {
                return BadRequest<bool>(ex.Message);
            }
        }


        public async Task<Result<bool>> DeleteAsync(string Id)
        {
            var user = await _unitOfWork.UserRepo.GetByIdAsync(Id);
            if (user == null)
            {
                return NotFound<bool>("User is not exist!");
            }

            try
            {
                await _unitOfWork.UserRepo.DeleteAsync(user);
                return Success(true);
            }
            catch (Exception ex)
            {
                return BadRequest<bool>(ex.Message);
            }
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
    }
}
