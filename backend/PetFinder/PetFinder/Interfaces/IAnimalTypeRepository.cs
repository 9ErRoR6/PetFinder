using PetFinder.Dtos.AnimalType;
using PetFinder.Entities;
using PetFinder.Services;

namespace PetFinder.Interfaces
{
    public interface IAnimalTypeRepository
    {
        Task<ServiceResponse> Add(AnimalTypeDto model);
    }
}
