using System;
using System.ComponentModel.DataAnnotations;

namespace Learning.Models
{
    public class UserBadge
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public Register User { get; set; }
        public int BadgeId { get; set; }
        public Badge Badge { get; set; }
        public DateTime EarnedAt { get; set; } = DateTime.UtcNow;
    }
}
