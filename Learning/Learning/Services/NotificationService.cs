using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Learning.Data;
using Learning.Models;
using Microsoft.EntityFrameworkCore;

namespace Learning.Services
{
    public class NotificationService : INotificationService
    {
        private readonly QuestionAPIDbcontext _context;
        private readonly ICurrentUserContext _userContext;

        public NotificationService(QuestionAPIDbcontext context, ICurrentUserContext userContext)
        {
            _context = context;
            _userContext = userContext;
        }

        public async Task SendNotificationAsync(int? userId, string title, string message, string type, string? link = null)
        {
            var notification = new Notification
            {
                UserId = userId,
                SchoolId = _userContext.SchoolId,
                Title = title,
                Message = message,
                Type = type,
                Link = link,
                CreatedAt = DateTime.UtcNow,
                IsRead = false
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
        }

        public async Task SendSchoolNotificationAsync(int schoolId, string title, string message, string type, string? link = null)
        {
            var notification = new Notification
            {
                SchoolId = schoolId,
                Title = title,
                Message = message,
                Type = type,
                Link = link,
                CreatedAt = DateTime.UtcNow,
                IsRead = false
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Notification>> GetUserNotificationsAsync(int userId)
        {
            return await _context.Notifications
                .Where(n => n.UserId == userId || n.UserId == null)
                .OrderByDescending(n => n.CreatedAt)
                .Take(20)
                .ToListAsync();
        }

        public async Task MarkAsReadAsync(int notificationId)
        {
            var notification = await _context.Notifications.FindAsync(notificationId);
            if (notification != null)
            {
                notification.IsRead = true;
                await _context.SaveChangesAsync();
            }
        }

        public async Task MarkAllAsReadAsync(int userId)
        {
            var unread = await _context.Notifications
                .Where(n => (n.UserId == userId || n.UserId == null) && !n.IsRead)
                .ToListAsync();

            foreach (var n in unread)
            {
                n.IsRead = true;
            }

            await _context.SaveChangesAsync();
        }
    }
}
