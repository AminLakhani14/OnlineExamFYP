using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Learning.Models
{
    public class Attendance
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public int StudentId { get; set; }

        [ForeignKey("StudentId")]
        public virtual Register Student { get; set; }

        [Required]
        public int ClassId { get; set; }

        [ForeignKey("ClassId")]
        public virtual Class Class { get; set; }

        public int? SubjectId { get; set; }

        [ForeignKey("SubjectId")]
        public virtual Subject Subject { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; } // Present, Absent, Late, Excused

        public string Remarks { get; set; }

        public int SchoolId { get; set; }

        [ForeignKey("SchoolId")]
        public virtual School School { get; set; }
    }
}
