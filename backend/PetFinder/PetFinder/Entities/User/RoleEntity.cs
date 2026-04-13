using Microsoft.AspNetCore.Identity;

namespace PetFinder.Entities.User
{
    public class RoleEntity: IdentityRole<int>
    {
        public virtual ICollection<UserRoleEntity> UserRoles { get; set; }
    }
}
