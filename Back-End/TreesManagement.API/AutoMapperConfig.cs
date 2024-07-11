using AutoMapper;
using TM.Domain.Dtos.Request.Tree;
using TM.Domain.Dtos.Response.Tree;
using TM.Domain.Entity;

namespace TM.Application.Configs
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig() {
            CreateMap<Tree, GetTreeRes>();
            CreateMap<Tree, CreateTreeReq>();
            CreateMap<CreateTreeReq, Tree>();
            CreateMap<GetTreeRes, Tree>();
        }
    }
}
