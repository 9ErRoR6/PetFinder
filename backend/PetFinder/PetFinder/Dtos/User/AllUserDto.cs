using PetFinder.Entities.User;

namespace PetFinder.Dtos.User
{
    public class AllUserDto
    {
        internal class AllUsersDto
        {
            public string Id { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
            public string PhoneNumber { get; set; } = string.Empty;
            public string Role { get; set; } = string.Empty;
            public string FullName { get; set; } = string.Empty;
            public string? AvatarUrl { get; set; }
            public DateTime CreatedAt { get; set; } 
            public bool LockoutEnabled { get; set; }
        }
    }
}
