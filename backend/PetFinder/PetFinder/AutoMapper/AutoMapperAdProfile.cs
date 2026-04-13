using AutoMapper;
using PetFinder.Dtos.Ad;
using PetFinder.Entities.Ad;

namespace PetFinder.AutoMapper
{
    public class AutoMapperAdProfile:Profile
    {
        public AutoMapperAdProfile()
        {
            CreateMap<AdDto, AdEntity>().ReverseMap();
        }
    }
}
