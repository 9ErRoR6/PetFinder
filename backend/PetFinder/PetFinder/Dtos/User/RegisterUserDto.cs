namespace PetFinder.Dtos.User
{
    public class RegisterUserDto
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string ConfirmPassword { get; set; } = string.Empty;
        private string? _imagePath;
        public string? ImagePath
        {
            get => _imagePath;
            set => _imagePath = value ?? defaultPath;
        }
        const string defaultPath = "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png";
    }
}
