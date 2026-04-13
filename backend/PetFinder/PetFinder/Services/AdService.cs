using AutoMapper;
using PetFinder.Dtos.Ad;
using PetFinder.Dtos.AnimalType;
using PetFinder.Entities;
using PetFinder.Entities.Ad;
//using System.Data.Entity;
using Microsoft.EntityFrameworkCore;
using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using System.Net;
using Microsoft.AspNetCore.Mvc;

namespace PetFinder.Services
{
    public class AdService
    {
        private readonly IMapper _mapper;
        private readonly DbAppContext _context;
        private readonly Cloudinary _cloudinary;
        public AdService(IMapper mapper, DbAppContext context, Cloudinary cloudinary)
        {
            _mapper = mapper;
            _context = context;
            _cloudinary = cloudinary;
        }
        public async Task<ServiceResponse> Add(AdDto model)
        {
            var ad = _mapper.Map<AdEntity>(model);

            if (model.ImageUrl != null && model.ImageUrl.Length > 0)
            {
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(model.ImageUrl.FileName, model.ImageUrl.OpenReadStream()),
                    Folder = "petfinder/ads"
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                if (uploadResult.StatusCode == HttpStatusCode.OK)
                {
                    ad.ImageUrl = uploadResult.SecureUrl.ToString();
                }
                else
                {
                    return new ServiceResponse
                    {
                        Success = false,
                        Message = "Image upload failed"
                    };
                }
            }

            await _context.Ads.AddAsync(ad);
            var result = await _context.SaveChangesAsync();

            return new ServiceResponse
            {
                Success = result > 0,
                Message = result > 0 ? "Ad successfully added!" : "Failed to add ad"
            };
        }
        public async Task<ServiceResponse> GetAll()
        {
            var adds =  _context.Ads.Include(x => x.AnimalType).Include(x => x.User).ToList();
            if (adds == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Adds not loaded"
                };
            }
            return new ServiceResponse
            {
                Success = true,
                Message = "Adds loaded",
                Payload = adds
            };
        }
        public async Task<ServiceResponse> GetById(int id)
        {
            var ad = await _context.Ads.Include(x => x.AnimalType).Include(x=>x.User).SingleOrDefaultAsync(x => x.Id == id);
            if (ad == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "ad not find!"
                };
            }
            return new ServiceResponse
            {
                Success = true,
                Message = "ad loaded",
                Payload = _mapper.Map<AdEntity>(ad)
            };
        }
        public async Task<ServiceResponse> ChangeStatus(int id, bool isLost)
        {
            var ad = await _context.Ads.FindAsync(id);
            if (ad == null) {  
                return new ServiceResponse
                {
                    Success = false,
                    Message = "ad not find!"
                };
            }

            ad.IsLost = isLost;
            await _context.SaveChangesAsync();
            return new ServiceResponse
            {
                Success = true,
                Message = "Status change",
                Payload = _mapper.Map<AdEntity>(ad)
            };
        }

        public async Task<ServiceResponse> Delete(int id)
        {
            var ad = await _context.Ads.FindAsync(id);
            if (ad == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "ad not find!"
                };
            }

            _context.Ads.Remove(ad);
            await _context.SaveChangesAsync();
            return new ServiceResponse
            {
                Success = true,
                Message = "Ad was deleted"
            };
        }
    }
}
