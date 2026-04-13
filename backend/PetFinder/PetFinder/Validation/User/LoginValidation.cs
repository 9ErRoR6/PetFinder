using FluentValidation;
using PetFinder.Dtos.User;

namespace PetFinder.Validation.User
{
    public class LoginValidation: AbstractValidator<LoginUserDto>
    {
        public LoginValidation()
        {
            RuleFor(r => r.Email).NotEmpty().EmailAddress();
            RuleFor(r => r.Password).NotEmpty().MinimumLength(6);
        }
    }
}
