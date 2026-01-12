using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Learning.Models
{
    public class Exam
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public int DurationMinutes { get; set; }

        [Required]
        public DateTime StartTime { get; set; }

        [Required]
        public DateTime EndTime { get; set; }

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

        public string ExamType { get; set; } // "MCQ" or "Subjective"

        public int SchoolId { get; set; }

        [ForeignKey("SchoolId")]
        public virtual School School { get; set; }

        public virtual ICollection<ExamQuestion> Questions { get; set; }
    }

    public class ExamQuestion
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public int ExamId { get; set; }

        [ForeignKey("ExamId")]
        public virtual Exam Exam { get; set; }

        // Link to either MCQ or QA - polymorphic-ish or just nullable or specific fields
        public int? MCQId { get; set; }
        
        [ForeignKey("MCQId")]
        public virtual MCQs MCQ { get; set; }

        public int? QAId { get; set; }

        [ForeignKey("QAId")]
        public virtual QuestionAnswer QA { get; set; }
    }
}
