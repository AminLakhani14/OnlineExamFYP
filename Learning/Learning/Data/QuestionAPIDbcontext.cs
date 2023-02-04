using Learning.Models;
using Microsoft.EntityFrameworkCore;

namespace Learning.Data
{
    public class QuestionAPIDbcontext : DbContext
    {
        public QuestionAPIDbcontext(DbContextOptions options ) : base( options ) 
        { 
        }

        public DbSet<QuestionAnswer> QuestionAnswer { get; set; }
    }
}
