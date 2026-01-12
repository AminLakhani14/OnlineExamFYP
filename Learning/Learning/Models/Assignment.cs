using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Learning.Models
{
    public class Assignment
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; }

        public string Description { get; set; }

        public string FilePath { get; set; } // Instructions file

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        public int MaxMarks { get; set; }

        [Required]
        public int ClassId { get; set; }

        [ForeignKey("ClassId")]
        public virtual Class Class { get; set; }

        [Required]
        public int SubjectId { get; set; }

        [ForeignKey("SubjectId")]
        public virtual Subject Subject { get; set; }

        [Required]
        public int TeacherId { get; set; }

        [ForeignKey("TeacherId")]
        public virtual Register Teacher { get; set; }

        public int SchoolId { get; set; }

        [ForeignKey("SchoolId")]
        public virtual School School { get; set; }

        public virtual ICollection<AssignmentSubmission> Submissions { get; set; }
    }

    public class AssignmentSubmission
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public int AssignmentId { get; set; }

        [ForeignKey("AssignmentId")]
        public virtual Assignment Assignment { get; set; }

        [Required]
        public int StudentId { get; set; }

        [ForeignKey("StudentId")]
        public virtual Register Student { get; set; }

        [Required]
        public string FilePath { get; set; } // Submitted work

        public DateTime SubmissionDate { get; set; } = DateTime.UtcNow;

        public int? MarksObtained { get; set; }

        public string TeacherRemarks { get; set; }

        public int SchoolId { get; set; }
    }
}
