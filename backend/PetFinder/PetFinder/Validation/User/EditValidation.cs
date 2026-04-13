using FluentValidation;
using PetFinder.Dtos.User;

namespace PetFinder.Validation.User
{
    public class EditValidation : AbstractValidator<EditUserDto>
    {
        public EditValidation()
        {
            RuleFor(r => r.FullName).NotEmpty();
            RuleFor(r => r.Email).NotEmpty().EmailAddress();
            RuleFor(r => r.PhoneNumber).NotEmpty();
        }
    }
}
