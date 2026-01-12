using System;
using System.ComponentModel.DataAnnotations;

namespace Learning.Models
{
    public class UserStreak
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public Register User { get; set; }
        public int CurrentStreak { get; set; }
        public int LongestStreak { get; set; }
        public DateTime LastActivityDate { get; set; }
    }
}
