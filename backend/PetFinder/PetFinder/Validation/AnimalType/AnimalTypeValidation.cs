using FluentValidation;
using PetFinder.Dtos.AnimalType;

namespace PetFinder.Validation.AnimalType
{
    public class AnimalTypeValidation:AbstractValidator<AnimalTypeDto>
    {
        public AnimalTypeValidation()
        {
            RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required")
            .MaximumLength(100).WithMessage("Name can't be longer than 100 characters");
        }
    }
}
