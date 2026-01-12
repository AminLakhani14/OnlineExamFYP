using System.Security.Claims;

namespace Learning.Services
{
    public interface ICurrentUserContext
    {
        int SchoolId { get; }
        string Role { get; }
        int UserId { get; }
    }

    public class CurrentUserContext : ICurrentUserContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserContext(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int SchoolId
        {
            get
            {
                var schoolIdClaim = _httpContextAccessor.HttpContext?.User.FindFirst("SchoolId")?.Value;
                return int.TryParse(schoolIdClaim, out int id) ? id : 0;
            }
        }

        public string Role => _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.Role)?.Value ?? "GUEST";

        public int UserId
        {
            get
            {
                var userIdClaim = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                return int.TryParse(userIdClaim, out int id) ? id : 0;
            }
        }
    }
}
