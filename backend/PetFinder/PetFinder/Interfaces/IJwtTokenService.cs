using PetFinder.Entities;

namespace PetFinder.Interfaces
{
    public interface IJwtTokenService
    {
        Task Create(RefreshToken refreshToken);
        Task Update(RefreshToken refreshToken);
        Task Delete(RefreshToken refreshToken);
        Task<IEnumerable<RefreshToken>> GetAll();
        Task<RefreshToken?> GetRefreshToken(string token);
    }
}
