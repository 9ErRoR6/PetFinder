using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PetFinder.Constants;
using PetFinder.Dtos.Token;
using PetFinder.Dtos.User;
using PetFinder.Entities.User;
using PetFinder.Services;
using PetFinder.Validation.Token;
using PetFinder.Validation.User;
using System.Data.Entity;
using static PetFinder.Dtos.User.AllUserDto;

namespace PetFinder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly UserService _userService;
        public UserController(UserService userService)
        {
            _userService = userService;
        }
        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var user = await _userService.GetByAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user.Payload);
        }
        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllUsers()
        {
            var result = await _userService.GetAll();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);


        }
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> InsertAsync([FromBody] RegisterUserDto model)
        {
            var validator = new RegisterValidation();
            var validationresult = await validator.ValidateAsync(model);
            if (validationresult.IsValid)
            {
                var result = await _userService.RegisterAsync(model);
                return Ok(result);
            }
            return BadRequest(validationresult.Errors);
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> LogInAsync([FromBody] LoginUserDto model)
        {
            var valdator = new LoginValidation();
            var validationresult = await valdator.ValidateAsync(model);
            if (!validationresult.IsValid)
                return BadRequest(validationresult.Errors);

            var response = await _userService.LoginAsync(model);
            if (!response.Success)
                return BadRequest(new { message = response.Message });

            return Ok(response.AccessToken);
        }
        [HttpDelete("deleteUser")]
        public async Task<IActionResult> DeleteUser(string email)
        {
            var result = await _userService.DeleteUserAsync(email);

            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }
        [AllowAnonymous]
        [HttpPost("RefreshToken")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenRequestDto model)
        {
            var validator = new TokenRequestValidation();
            var validationResult = await validator.ValidateAsync(model);
            if (validationResult.IsValid)
            {
                var result = await _userService.RefreshTokenAsync(model);
                if (result.Success)
                {
                    return Ok(result);
                }
                return BadRequest(result);
            }
            else
            {
                return BadRequest(validationResult.Errors);
            }
        }
        [HttpGet("logout")]
        public async Task<IActionResult> LogoutAsync(string userId)
        {
            var result = await _userService.LogoutAsync(userId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpPost("editUserProfile")]
        public async Task<IActionResult> EditProfile([FromBody] EditUserDto model)
        {
            var result = await _userService.EditProfileAsync(model);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [HttpPost("editUser")]
        public async Task<IActionResult> EditUser([FromBody] EditUserDto model)
        {
            var validator = new EditValidation();
            var validationResult = await validator.ValidateAsync(model);
            if (validationResult.IsValid)
            {
                var result = await _userService.EditAsync(model);
                if (result.Success)
                {
                    return Ok(result);
                }

                return BadRequest(result);
            }
            return BadRequest(validationResult.Errors);
        }
        [HttpPost("blockUser")]
        public async Task<IActionResult> BlockUserAsync(string email)
        {
            var result = await _userService.BlockUserAsync(email);

            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }
    }

}
