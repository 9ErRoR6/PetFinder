using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PetFinder.Constants;
using PetFinder.Dtos.Token;
using PetFinder.Dtos.User;
using PetFinder.Entities;
using PetFinder.Entities.User;
using static PetFinder.Dtos.User.AllUserDto;
namespace PetFinder.Services
{
    public class UserService
    {
        private readonly IMapper _mapper;
        private readonly UserManager<UserEntity> _userManager;
        private readonly JwtService _jwtService;
        private readonly SignInManager<UserEntity> _signInManager;
        private readonly IConfiguration _configuration;
        public UserService(IMapper mapper, UserManager<UserEntity> userManager, SignInManager<UserEntity> signInManager, JwtService jwtService, IConfiguration configuration)
        {
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtService = jwtService;
            _configuration = configuration;
        }
        public async Task<ServiceResponse> RegisterAsync(RegisterUserDto model)
        {
            var mappedUser = _mapper.Map<UserEntity>(model);
            var result = await _userManager.CreateAsync(mappedUser, model.Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(mappedUser, Roles.User);
                return new ServiceResponse
                {
                    Success = true,
                    Message = "User successfully created.",
                };
            }
            else
            {

                return new ServiceResponse
                {
                    Success = false,
                    Message = result.Errors.Select(e => e.Description).FirstOrDefault()
                };
            }
        }
        public async Task<ServiceResponse> LoginAsync(LoginUserDto model)
        {
            UserEntity user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Login or password incorrect."
                };
            }
            if (!await _userManager.CheckPasswordAsync(user, model.Password))
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Login or password incorrect."
                };
            }

            var result = await _signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, lockoutOnFailure: true);
            if (result.Succeeded)
            {
                var tokens = await _jwtService.GenerateJwtTokenAsync(user);
                return new ServiceResponse
                {
                    AccessToken = tokens.token,
                    RefreshToken = tokens.refreshToken.Token,
                    Success = true,
                    Message = "User logged in successfully."
                };
            }

            if (result.IsNotAllowed)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Confirm your email please."
                };
            }

            if (result.IsLockedOut)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Your account is locked. Connect with administrator."
                };
            }

            return new ServiceResponse
            {
                Success = false,
                Message = "User or password incorrect."
            };
        }
        public async Task<ServiceResponse> LogoutAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User not found."
                };
            }
            IEnumerable<RefreshToken> tokens = await _jwtService.GetAll();
            foreach (RefreshToken token in tokens)
            {
                await _jwtService.Delete(token);
            }

            return new ServiceResponse
            {
                Success = true,
                Message = "User successfully logged out."
            };
        }
        public async Task<ServiceResponse> GetAll()
        {
            List<UserEntity> users = await _userManager.Users.ToListAsync();
            List<AllUsersDto> mappedUsers = users.Select(u => _mapper.Map<UserEntity, AllUsersDto>(u)).ToList();
            for (int i = 0; i < users.Count; i++)
            {
                mappedUsers[i].Role = (await _userManager.GetRolesAsync(users[i])).FirstOrDefault();
            }

            return new ServiceResponse
            {
                Success = true,
                Message = "All users loaded.",
                Payload = mappedUsers
            };
        }
        public async Task<ServiceResponse> RefreshTokenAsync(TokenRequestDto model)
        {
            return await _jwtService.VerifyTokenAsync(model);
        }
        public async Task<ServiceResponse> GetByAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User not found."
                };
            }

            
            return new ServiceResponse
            {
                Success = true,
                Message = "User loaded.",
                Payload = user
            };
        }
        public async Task<ServiceResponse> DeleteUserAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User not found."
                };
            }

            var res = await _userManager.DeleteAsync(user);

            return new ServiceResponse
            {
                Success = true,
                Message = "User deleted."
            };
        }
        public async Task<ServiceResponse> BlockUserAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User not found."
                };
            }

            if (await _userManager.IsLockedOutAsync(user))
            {
                await _userManager.SetLockoutEndDateAsync(user, DateTime.UtcNow);
                await _userManager.SetLockoutEnabledAsync(user, false);
            }
            else
            {
                await _userManager.SetLockoutEndDateAsync(user, DateTime.UtcNow.AddYears(5));
                await _userManager.SetLockoutEnabledAsync(user, true);
            }

            return new ServiceResponse
            {
                Success = true,
                Message = "User blocked or unblocked."
            };
        }
        public async Task<ServiceResponse> EditProfileAsync(EditUserDto model)
        {
            var user = await _userManager.FindByIdAsync(model.Id);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User not found."
                };
            }

            user.FullName = model.FullName;
            user.Email = model.Email;
            user.PhoneNumber = model.PhoneNumber;

            await _userManager.UpdateAsync(user);

            return new ServiceResponse
            {
                Success = true,
                Message = "Profile updated!"
            };
        }
        public async Task<ServiceResponse> EditAsync(EditUserDto model)
        {
            var user = await _userManager.FindByIdAsync(model.Id);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User not found."
                };
            }

            user.FullName = model.FullName;
            user.Email = model.Email;
            user.PhoneNumber = model.PhoneNumber;
            user.AvatarUrl = model.ImageUrl;

            await _userManager.UpdateAsync(user);

            return new ServiceResponse
            {
                Success = true,
                Message = "Profile updated!"
            };

        }
    }
}
