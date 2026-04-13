using Ardalis.Specification;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace PetFinder.Entities.Specification
{
    public static class RefreshTokenSpecification
    {
        public class GetRefreshToken : Specification<RefreshToken>
        {
            public GetRefreshToken(string refreshToken)
            {
                Query.Where(x => x.Token == refreshToken);
            }
        }
    }
}
