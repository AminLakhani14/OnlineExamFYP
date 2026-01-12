using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Learning.Models
{
    public class StudyMaterial
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public string FilePath { get; set; }

        [StringLength(50)]
        public string FileType { get; set; } // PDF, PPT, Video, Link

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

        public DateTime UploadDate { get; set; } = DateTime.UtcNow;

        public int SchoolId { get; set; }

        [ForeignKey("SchoolId")]
        public virtual School School { get; set; }
    }
}
