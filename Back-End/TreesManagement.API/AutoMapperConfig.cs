using AutoMapper;
using TM.Domain.Dtos.Request.Assignment;
using TM.Domain.Dtos.Request.Tree;
using TM.Domain.Dtos.Request.TypeTree;
using TM.Domain.Dtos.Request.User;
using TM.Domain.Dtos.Request.WorkContent;
using TM.Domain.Dtos.Response.Assignment;
using TM.Domain.Dtos.Response.Tree;
using TM.Domain.Dtos.Response.TypeTree;
using TM.Domain.Dtos.Response.User;
using TM.Domain.Dtos.Response.WorkContent;
using TM.Domain.Entity;

namespace TM.Application.Configs
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<User, UserRes>();
            CreateMap<RegisterReq, User>();
            CreateMap<UpdateUserReq, User>();

            CreateMap<Tree, TreeRes>()
                .ForMember(dest => dest.TypeTree, opt => opt.MapFrom(src => src.TypeTree.Name))
                .ForMember(dest => dest.Lat, opt => opt.MapFrom(src => src.Position.Lat))
                .ForMember(dest => dest.Lng, opt => opt.MapFrom(src => src.Position.Lng));

            CreateMap<TreeReq, Tree>()
                .ForMember(dest => dest.Position, opt => opt.Ignore())
                .ForMember(dest => dest.TypeTree, opt => opt.Ignore());

            CreateMap<AssignmentReq, Assignment>()
                .ForMember(dest => dest.WorkContent, opt => opt.MapFrom(src => src.WorkContent));
            CreateMap<Assignment, AssignmentRes>();
            CreateMap<Assignment, UserAssignment>();
            CreateMap<Assignment, TreeAssignment>();

            CreateMap<Tree, TreeDtos>()
                .ForMember(dest => dest.Lat, opt => opt.MapFrom(src => src.Position.Lat))
                .ForMember(dest => dest.Lng, opt => opt.MapFrom(src => src.Position.Lng));
            CreateMap<TypeTree, TypeTreeRes>();
            CreateMap<TypeTreeReq, TypeTree>();

            CreateMap<WorkContent, WorkContentRes>();
            CreateMap<WorkContentReq, WorkContent>()
                .ForMember(dest => dest.Id, opt => opt.Condition(src => !string.IsNullOrEmpty(src.Id)));
        }
    }
}
