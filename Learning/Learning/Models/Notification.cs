using System;
using System.ComponentModel.DataAnnotations;

namespace Learning.Models
{
    public class Notification
    {
        [Key]
        public int Id { get; set; }
        public int? UserId { get; set; } // Receiver. Null means "System Wide" or "School Wide"
        public Register User { get; set; }
        public int? SchoolId { get; set; }
        public School School { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public string Type { get; set; } // e.g., "ExamResult", "Attendance", "Announcement", "Remark"
        public bool IsRead { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string? Link { get; set; } // Optional link to redirect on click
    }
}
