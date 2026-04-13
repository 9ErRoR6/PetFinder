using FluentValidation;
using PetFinder.Dtos.Ad;

namespace PetFinder.Validation.Ad
{
    public class AdValidation: AbstractValidator<AdDto>
    {
        public AdValidation()
        {
            RuleFor(r => r.UserId).NotEmpty().GreaterThan(0).WithMessage("UserId має бути більше нуля.");
            RuleFor(r => r.Title).NotEmpty().WithMessage("Заголовок обов'язковий.").MaximumLength(100).WithMessage("Заголовок не може бути довшим за 100 символів.");
            RuleFor(r => r.Description).NotEmpty().WithMessage("Опис обов'язковий.").MaximumLength(1000).WithMessage("Опис не може бути довшим за 1000 символів.");
            RuleFor(r => r.AnimalTypeId).GreaterThan(0).WithMessage("AnimalTypeId має бути більше нуля.");
            RuleFor(r => r.Color).NotEmpty().WithMessage("Колір обов'язковий.").MaximumLength(50).WithMessage("Колір не може бути довшим за 50 символів.");
            RuleFor(r => r.Latitude).InclusiveBetween(-90, 90).WithMessage("Широта повинна бути в діапазоні від -90 до 90.");
            RuleFor(ad => ad.Longitude).InclusiveBetween(-180, 180).WithMessage("Довгота повинна бути в діапазоні від -180 до 180.");
            RuleFor(ad => ad.Date).LessThanOrEqualTo(DateTime.UtcNow).WithMessage("Дата не може бути в майбутньому.");
        }
    }
}
