using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.AspNetCore.Mvc;
using PetFinder.Dtos.AnimalType;
using PetFinder.Dtos.User;
using PetFinder.Services;
using PetFinder.Validation.AnimalType;
using PetFinder.Validation.User;

namespace PetFinder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalTypeController : ControllerBase
    {
        public readonly AnimalTypeService _animalTypeService;
        public AnimalTypeController(AnimalTypeService animalTypeService)
        {
            _animalTypeService = animalTypeService;
        }
        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] AnimalTypeDto model)
        {
            var validator = new AnimalTypeValidation();
            var validationresult = await validator.ValidateAsync(model);
            if (validationresult.IsValid)
            {
                var result = await _animalTypeService.Add(model);
                return Ok(result.Message);
            }
            return BadRequest(validationresult.Errors);
        }
        [HttpGet("GetByAsync")]
        [AllowAnonymous]
        public async Task<IActionResult> GetByAsync(int id)
        {
            var type = await _animalTypeService.GetById(id);
            if(type.Success)
            {
                return Ok(type.Payload);
            }
            return BadRequest(type.Message);
        }
        [HttpGet("GetAllAsync")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllAsync()
        {
            var types = await _animalTypeService.GetAll();
            if(types.Success)
            {
                return Ok(types.Payload);
            }
            return BadRequest(types.Message);
        }
        [HttpDelete("DeleteAsync")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _animalTypeService.Delete(id);
            if(result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }
    }
}
