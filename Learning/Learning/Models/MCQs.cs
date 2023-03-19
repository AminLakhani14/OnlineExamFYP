namespace Learning.Models
{
    public class MCQs
    {
        public int Id { get; set; }
        public string course { get; set; }
        public string Question { get; set; }
        public string OptionA { get; set; }
        public string OptionB { get; set; }
        public string OptionC { get; set; }
        public string OptionD { get; set; }
        public string CorrectAnswer { get; set; }
        public string marks { get; set; }
    }
}
