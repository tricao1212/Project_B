using AutoMapper;
using TM.Domain.Dtos.Request.Tree;
using TM.Domain.Dtos.Request.User;
using TM.Domain.Dtos.Response.Tree;
using TM.Domain.Dtos.Response.User;
using TM.Domain.Entity;

namespace TM.Application.Configs
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig() {
            CreateMap<Tree, GetTreeRes>();
            CreateMap<CreateTreeReq, Tree>();
            CreateMap<User, UserRes>();
            CreateMap<User, LoginRes>();
            CreateMap<RegisterReq, User>();
        }
    }
}
