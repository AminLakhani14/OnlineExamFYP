using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Learning.Models
{
    public class SchoolSettings
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public int SchoolId { get; set; }
        
        [ForeignKey("SchoolId")]
        public School School { get; set; }

        public string? PrimaryColor { get; set; }
        public string? SecondaryColor { get; set; }
        public string? LogoPath { get; set; }
        
        // Grading Configuration (JSON or simple settings)
        public double PassingPercentage { get; set; } = 40.0;
        public string GradingSystem { get; set; } = "Relative"; // Relative, Absolute
        
        public bool EnableGamification { get; set; } = true;
        public bool EnableAIQuizzes { get; set; } = true;
    }
}
