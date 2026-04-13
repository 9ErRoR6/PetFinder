using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetFinder.Dtos.AnimalType;
using PetFinder.Dtos.User;
using PetFinder.Entities;
using PetFinder.Entities.User;
using PetFinder.Interfaces;

namespace PetFinder.Services
{
    public class AnimalTypeService
    {
        private readonly IMapper _mapper;
        private readonly DbAppContext _context;
        public AnimalTypeService(IMapper mapper,DbAppContext context )
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<ServiceResponse> Add(AnimalTypeDto model)
        {
            var animalType = _mapper.Map<AnimalTypeEntity>(model);
            await _context.AnimalTypes.AddAsync(animalType);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return new ServiceResponse
                {
                    Success = true,
                    Message = "Animal type successfully added!"
                };
            }
            else
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = result.ToString()
                };
            }
        }
        public async Task<ServiceResponse> GetById(int id)
        {
            var type = await _context.AnimalTypes.SingleOrDefaultAsync(x => x.Id == id);
            if (type == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Type not find!"
                };
            }
            return new ServiceResponse
            {
                Success = true,
                Message = "Type loaded",
                Payload = type
            };
        }
        public async Task<ServiceResponse> GetAll()
        {
            var types = await _context.AnimalTypes.ToListAsync();
            if (types == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Types not loaded"
                };
            }
            return new ServiceResponse
            {
                Success = true,
                Message = "Types loaded",
                Payload = types
            };
        }
        public async Task<ServiceResponse> Delete(int id)
        {
            var type = await _context.AnimalTypes.SingleOrDefaultAsync(x => x.Id == id);
            if (type == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Type not find!"
                };
            }
            _context.AnimalTypes.Remove(type);
            await _context.SaveChangesAsync();
            return new ServiceResponse
            {
                Success = true,
                Message = "Type deleted",
            };
        }
    }
}
