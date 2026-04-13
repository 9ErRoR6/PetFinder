using Microsoft.AspNet.Identity.EntityFramework;

namespace PetFinder.Entities.User
{
    public class UserRoleEntity : IdentityUserRole<int>
    {
        public virtual UserEntity User { get; set; }
        public virtual RoleEntity Role { get; set; }
    }
}
