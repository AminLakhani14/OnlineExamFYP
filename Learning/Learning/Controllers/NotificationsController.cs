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
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationsController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetNotifications()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (userId == 0) return Unauthorized();

            var notifications = await _notificationService.GetUserNotificationsAsync(userId);
            return Ok(notifications);
        }

        [HttpPost("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            await _notificationService.MarkAsReadAsync(id);
            return Ok();
        }

        [HttpPost("read-all")]
        public async Task<IActionResult> MarkAllAsRead()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (userId == 0) return Unauthorized();

            await _notificationService.MarkAllAsReadAsync(userId);
            return Ok();
        }

        [HttpPost("announcement")]
        [Authorize(Roles = "Admin,SA,Teacher")]
        public async Task<IActionResult> SendAnnouncement([FromBody] AnnouncementRequest request)
        {
            // The service uses _userContext.SchoolId internally
            await _notificationService.SendSchoolNotificationAsync(0, request.Title, request.Message, "Announcement", request.Link);
            return Ok(new { message = "Announcement sent to all students." });
        }
    }

    public class AnnouncementRequest
    {
        public string Title { get; set; }
        public string Message { get; set; }
        public string? Link { get; set; }
    }
}
