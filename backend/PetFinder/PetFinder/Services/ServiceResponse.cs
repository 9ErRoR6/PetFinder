namespace PetFinder.Services
{
    public class ServiceResponse
    {
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public string Message { get; set; }
        public bool Success { get; set; }
        public object Payload { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}
