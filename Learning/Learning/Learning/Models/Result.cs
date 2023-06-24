namespace Learning.Models
{
    public class Result
    {
        public int Id { get; set; }
        public List<Register> Register { get; set; }
        public List<QAMarks> QAMarks { get; set; }
        public List<MCQmarks> MCQmarks { get; set; }
    }
}
