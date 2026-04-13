using AutoMapper;
using PetFinder.Dtos.User;
using PetFinder.Entities.User;
using static PetFinder.Dtos.User.AllUserDto;

namespace PetFinder.AutoMapper
{
    public class AutoMapperUserProfile:Profile
    {
        public AutoMapperUserProfile()
        {
            CreateMap<UserEntity, AllUsersDto>().ReverseMap();
            CreateMap<UserEntity, RegisterUserDto>();
            CreateMap<RegisterUserDto, UserEntity>().ForMember(dst => dst.UserName, act => act.MapFrom(src => src.Email));
        }
    }
}
