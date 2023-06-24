namespace Learning.Models
{
    public class MCQmarks
    {
        public Guid ID { get; set; }
        public Guid RegisterID { get; set; }
        public Register Register { get; set; }

        public int MCQMarks { get; set; }
        public int TotalMarks { get; set; }
        public string course { get; set; }

     
    }
}
