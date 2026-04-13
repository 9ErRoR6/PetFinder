using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace PetFinder.Entities.User
{
    public class UserEntity: IdentityUser<int>
    {
        [StringLength(200)]
        public string FullName { get; set; } 
        public string? PhoneNumber { get; set; }
        public string? AvatarUrl { get; set; } = "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public virtual ICollection<UserRoleEntity> UserRoles { get; set; }
    }
}
