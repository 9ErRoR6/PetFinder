using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PetFinder.Dtos.Ad;
using PetFinder.Dtos.User;
using PetFinder.Services;
using PetFinder.Validation.Ad;
using PetFinder.Validation.User;

namespace PetFinder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdController : ControllerBase
    {
        private readonly AdService _adService;
        public AdController(AdService adService)
        {
            _adService = adService;
        }
        [HttpPost("Add")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> InsertAsync([FromForm] AdDto model)
        {
            var validator = new AdValidation();
            var validationresult = await validator.ValidateAsync(model);
            if (validationresult.IsValid)
            {
                var result = await _adService.Add(model);
                return Ok(result);
            }
            return BadRequest(validationresult.Errors);
        }
        [HttpGet("GetAllAsync")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllAsync()
        {
            var adds = await _adService.GetAll();
            if (adds.Success)
            {
                return Ok(adds.Payload);
            }
            return BadRequest(adds.Message);
        }
        [HttpGet("GetByAsync")]
        [AllowAnonymous]
        public async Task<IActionResult> GetByAsync(int id)
        {
            var type = await _adService.GetById(id);
            if (type.Success)
            {
                return Ok(type.Payload);
            }
            return BadRequest(type.Message);
        }
        [HttpGet("ChangeStatus")]
        public async Task<IActionResult> ChangeStatusAsync(int id, bool isLost)
        {
            var result = await _adService.ChangeStatus(id, isLost);
            if (result.Success)
            {
                return Ok(result.Payload);
            }
            return BadRequest(result.Message);
        }
        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _adService.Delete(id);
            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }
    }
}
