using FluentValidation;
using PetFinder.Dtos.Token;

namespace PetFinder.Validation.Token
{
    public class TokenRequestValidation: AbstractValidator<TokenRequestDto>
    {
        public TokenRequestValidation()
        {
            RuleFor(r => r.Token).NotEmpty();
            RuleFor(r => r.RefreshToken).NotEmpty();
        }
    }
}
