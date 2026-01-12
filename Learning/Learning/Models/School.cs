using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Learning.Models
{
    public class School
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = true;

        // Navigation property
        public ICollection<Register> Users { get; set; }
    }
}
