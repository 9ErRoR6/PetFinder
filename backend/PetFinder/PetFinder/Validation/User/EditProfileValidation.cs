using FluentValidation;
using PetFinder.Dtos.User;

namespace PetFinder.Validation.User
{
    public class EditProfileValidation:AbstractValidator<EditUserProfileDto>
    {
        public EditProfileValidation()
        {
            RuleFor(r => r.FullName).NotEmpty();
            RuleFor(r => r.Email).NotEmpty().EmailAddress();
            RuleFor(r => r.PhoneNumber).NotEmpty();
        }
    }
}
