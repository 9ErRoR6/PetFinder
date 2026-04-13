using FluentValidation;
using PetFinder.Dtos.User;

namespace PetFinder.Validation.User
{
    public class RegisterValidation: AbstractValidator<RegisterUserDto>
    {
        public RegisterValidation()
        {
            RuleFor(r => r.FullName).NotEmpty();
            RuleFor(r => r.Email).NotEmpty().EmailAddress();
            RuleFor(r => r.Password).NotEmpty().MinimumLength(6);
            RuleFor(r => r.ConfirmPassword).NotEmpty().MinimumLength(6);
            RuleFor(r => r.ConfirmPassword).Equal(x => x.Password);
        }
    }
}
