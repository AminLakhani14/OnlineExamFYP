using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Learning.Data;
using Learning.Models;
using Microsoft.AspNetCore.Authorization;
using Learning.Services;

namespace Learning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AttendanceController : ControllerBase
    {
        private readonly QuestionAPIDbcontext _context;
        private readonly ICurrentUserContext _userContext;
        private readonly INotificationService _notificationService;

        public AttendanceController(QuestionAPIDbcontext context, ICurrentUserContext userContext, INotificationService notificationService)
        {
            _context = context;
            _userContext = userContext;
            _notificationService = notificationService;
        }

        // GET: api/Attendance
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Attendance>>> GetAttendance(int? classId, DateTime? date)
        {
            var query = _context.Attendances.AsQueryable();

            if (classId.HasValue) query = query.Where(a => a.ClassId == classId);
            if (date.HasValue) query = query.Where(a => a.Date.Date == date.Value.Date);

            return await query.Include(a => a.Student).ToListAsync();
        }

        // POST: api/Attendance/bulk
        [HttpPost("bulk")]
        public async Task<IActionResult> PostAttendance(List<Attendance> attendances)
        {
            foreach (var attendance in attendances)
            {
                if (_userContext.Role != "SA")
                {
                    attendance.SchoolId = _userContext.SchoolId;
                }
                _context.Attendances.Add(attendance);

                // Notify if absent
                if (attendance.Status == "Absent")
                {
                    await _notificationService.SendNotificationAsync(attendance.StudentId, "Attendance Alert", $"You were marked Absent for {attendance.Date.ToShortDateString()}", "Attendance");
                }
            }
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
