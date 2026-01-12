using Microsoft.AspNetCore.Mvc;
using Learning.Services;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Learning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AnalyticsController : ControllerBase
    {
        private readonly IAnalyticsService _analyticsService;
        private readonly ICurrentUserContext _userContext;

        public AnalyticsController(IAnalyticsService analyticsService, ICurrentUserContext userContext)
        {
            _analyticsService = analyticsService;
            _userContext = userContext;
        }

        [HttpGet("overview")]
        [Authorize(Roles = "SA,Admin")]
        public async Task<IActionResult> GetOverview()
        {
            var schoolId = _userContext.SchoolId;
            var overview = await _analyticsService.GetAdminOverviewAsync(schoolId);
            return Ok(overview);
        }

        [HttpGet("class/{classId}")]
        [Authorize(Roles = "SA,Admin,Teacher")]
        public async Task<IActionResult> GetClassPerformance(int classId)
        {
            var performance = await _analyticsService.GetClassPerformanceAsync(classId);
            return Ok(performance);
        }

        [HttpGet("student/{studentId}")]
        [Authorize(Roles = "SA,Admin,Teacher,Student")]
        public async Task<IActionResult> GetStudentProgress(int studentId)
        {
            // If student, check if they are requesting their own data
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (_userContext.Role == "Student" && currentUserId != studentId) return Unauthorized();

            var progress = await _analyticsService.GetStudentProgressAsync(studentId);
            return Ok(progress);
        }

        [HttpGet("teacher/{teacherId}")]
        [Authorize(Roles = "SA,Admin")]
        public async Task<IActionResult> GetTeacherPerformance(int teacherId)
        {
            var performance = await _analyticsService.GetTeacherPerformanceAsync(teacherId);
            return Ok(performance);
        }
    }
}
