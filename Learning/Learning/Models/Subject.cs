using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Learning.Models
{
    public class Subject
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int SchoolId { get; set; }

        [Required]
        public int ClassId { get; set; }

        [ForeignKey("SchoolId")]
        public School School { get; set; }

        [ForeignKey("ClassId")]
        public Class Class { get; set; }

        // The teacher assigned to this subject in this class
        public int? TeacherId { get; set; }
        
        [ForeignKey("TeacherId")]
        public Register Teacher { get; set; }
    }
}
