using System.Collections.Generic;
using System.Threading.Tasks;
using Learning.Models;

namespace Learning.Services
{
    public interface INotificationService
    {
        Task SendNotificationAsync(int? userId, string title, string message, string type, string? link = null);
        Task SendSchoolNotificationAsync(int schoolId, string title, string message, string type, string? link = null);
        Task<List<Notification>> GetUserNotificationsAsync(int userId);
        Task MarkAsReadAsync(int notificationId);
        Task MarkAllAsReadAsync(int userId);
    }
}
