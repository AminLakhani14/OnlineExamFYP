using Learning.Models;
using Microsoft.EntityFrameworkCore;

namespace Learning.Data
{
    public class QuestionAPIDbcontext : DbContext
    {
        public QuestionAPIDbcontext(DbContextOptions<QuestionAPIDbcontext> options ) : base( options ) 
        { 
        }

        public DbSet<QuestionAnswer> QuestionAnswer { get; set; }
        public DbSet<Register> Register { get; set; }
        public DbSet<MCQs> MCQs { get; set; }


    }
}
