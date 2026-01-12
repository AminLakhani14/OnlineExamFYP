using System;
using System.ComponentModel.DataAnnotations;

namespace Learning.Models
{
    public class ChatMessage
    {
        [Key]
        public int Id { get; set; }
        public int SenderId { get; set; }
        public Register Sender { get; set; }
        public int ReceiverId { get; set; }
        public Register Receiver { get; set; }
        public string Message { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public bool IsRead { get; set; } = false;
        public int? SchoolId { get; set; }
        public School School { get; set; }
    }
}
