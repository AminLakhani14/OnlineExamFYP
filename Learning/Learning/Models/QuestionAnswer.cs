﻿using System.ComponentModel.DataAnnotations;

namespace Learning.Models
{
    public class QuestionAnswer
    {
        public int ID { get; set; }
        public string course { get; set; }
        public string Question { get; set; }
        public string  Answer { get; set; }

        public string Keyword1 { get; set;}
        public string Keyword2 { get; set;}
        public string Keyword3 { get; set;}
        public string Keyword4 { get; set;}
        public string Keyword5 { get; set;}
        public string marks { get; set;}

        public DateTime Created { get; set; }
        public DateTime? Completed { get; set; }



    }
}
