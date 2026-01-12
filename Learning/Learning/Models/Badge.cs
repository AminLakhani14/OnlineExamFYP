using System;
using System.ComponentModel.DataAnnotations;

namespace Learning.Models
{
    public class Badge
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Icon { get; set; }
        public string CriteriaType { get; set; } // e.g., "ExamScore", "Streak", "Attendance"
        public int CriteriaValue { get; set; }
    }
}
