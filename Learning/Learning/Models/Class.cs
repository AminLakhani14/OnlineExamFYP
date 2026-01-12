using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Learning.Models
{
    public class Class
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Name { get; set; } // e.g., Grade 10

        public string Section { get; set; } // e.g., A

        [Required]
        public int SchoolId { get; set; }

        [ForeignKey("SchoolId")]
        public School School { get; set; }

        public ICollection<Register> Students { get; set; }
        public ICollection<Subject> Subjects { get; set; }
    }
}
