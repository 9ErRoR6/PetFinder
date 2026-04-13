using PetFinder.Entities.User;
using PetFinder.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace PetFinder.Entities
{
    public class RefreshToken : IEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Token { get; set; } = string.Empty;
        public string JwtId { get; set; } = string.Empty;
        public bool IsUsed { get; set; }
        public bool IsRevoked { get; set; }
        public DateTime AddedDate { get; set; }
        public DateTime ExpiryDate { get; set; }

        [ForeignKey(nameof(UserId))]
        public UserEntity User { get; set; }
    }
}
