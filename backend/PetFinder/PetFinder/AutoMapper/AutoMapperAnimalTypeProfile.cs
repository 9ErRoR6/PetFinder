using AutoMapper;
using PetFinder.Dtos.AnimalType;
using PetFinder.Entities;

namespace PetFinder.AutoMapper
{
    public class AutoMapperAnimalTypeProfile: Profile
    {
        public AutoMapperAnimalTypeProfile()
        {
            CreateMap<AnimalTypeDto, AnimalTypeEntity>().ReverseMap();
        }
    }
}
