using Microsoft.AspNetCore.Mvc;
using Learning.Data;
using Learning.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace Learning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ChatController : ControllerBase
    {
        private readonly QuestionAPIDbcontext _context;

        public ChatController(QuestionAPIDbcontext context)
        {
            _context = context;
        }

        [HttpGet("messages/{otherUserId}")]
        public async Task<IActionResult> GetMessages(int otherUserId)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (userId == 0) return Unauthorized();

            var messages = await _context.ChatMessages
                .Where(m => (m.SenderId == userId && m.ReceiverId == otherUserId) || 
                            (m.SenderId == otherUserId && m.ReceiverId == userId))
                .OrderBy(m => m.Timestamp)
                .ToListAsync();

            // Mark as read
            var unread = messages.Where(m => m.ReceiverId == userId && !m.IsRead).ToList();
            if (unread.Any())
            {
                unread.ForEach(m => m.IsRead = true);
                await _context.SaveChangesAsync();
            }

            return Ok(messages);
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendMessage([FromBody] SendMessageRequest request)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (userId == 0) return Unauthorized();

            var message = new ChatMessage
            {
                SenderId = userId,
                ReceiverId = request.ReceiverId,
                Message = request.Message,
                Timestamp = DateTime.UtcNow,
                SchoolId = _context.Register.IgnoreQueryFilters().FirstOrDefault(u => u.ID == userId)?.SchoolId
            };

            _context.ChatMessages.Add(message);
            await _context.SaveChangesAsync();

            return Ok(message);
        }

        [HttpGet("contacts")]
        public async Task<IActionResult> GetContacts()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (userId == 0) return Unauthorized();

            var user = await _context.Register.FindAsync(userId);
            
            // If Student, show Teachers. If Teacher, show Students.
            var contacts = await _context.Register
                .Where(u => u.SchoolId == user.SchoolId && u.ID != userId)
                .Where(u => (user.Type == "Student" && u.Type == "Teacher") || 
                            (user.Type == "Teacher" && u.Type == "Student") ||
                            (user.Type == "SA" || user.Type == "Admin"))
                .Select(u => new { u.ID, u.UserName, u.Type })
                .ToListAsync();

            return Ok(contacts);
        }
    }

    public class SendMessageRequest
    {
        public int ReceiverId { get; set; }
        public string Message { get; set; }
    }
}
