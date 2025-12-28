using Learning.Models;
using Microsoft.EntityFrameworkCore;
using Learning.Services;

namespace Learning.Data
{
    public class QuestionAPIDbcontext : DbContext
    {
        private readonly ICurrentUserContext _userContext;

        public QuestionAPIDbcontext(DbContextOptions<QuestionAPIDbcontext> options, ICurrentUserContext userContext) : base(options)
        {
            _userContext = userContext;
        }

        public DbSet<QuestionAnswer> QuestionAnswer { get; set; }
        public DbSet<Register> Register { get; set; }
        public DbSet<MCQs> MCQs { get; set; }
        public DbSet<QAMarks> QAMarks { get; set; }
        public DbSet<MCQmarks> MCQmarks { get; set; }
        public DbSet<Result> Result { get; set; }
        public DbSet<School> Schools { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<StudyMaterial> StudyMaterials { get; set; }
        public DbSet<Exam> Exams { get; set; }
        public DbSet<ExamQuestion> ExamQuestions { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<AssignmentSubmission> AssignmentSubmissions { get; set; }
        public DbSet<Badge> Badges { get; set; }
        public DbSet<UserBadge> UserBadges { get; set; }
        public DbSet<UserStreak> UserStreaks { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }
        public DbSet<SchoolSettings> SchoolSettings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Class -> School
            modelBuilder.Entity<Class>()
                .HasOne(c => c.School)
                .WithMany() // Simplified for now
                .HasForeignKey(c => c.SchoolId)
                .OnDelete(DeleteBehavior.NoAction);

            // Configure Subject -> Class
            modelBuilder.Entity<Subject>()
                .HasOne(s => s.Class)
                .WithMany(c => c.Subjects)
                .HasForeignKey(s => s.ClassId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure Subject -> School
            modelBuilder.Entity<Subject>()
                .HasOne(s => s.School)
                .WithMany()
                .HasForeignKey(s => s.SchoolId)
                .OnDelete(DeleteBehavior.NoAction);
            
            // Configure Student -> Class
            modelBuilder.Entity<Register>()
                .HasOne(r => r.Class)
                .WithMany(c => c.Students)
                .HasForeignKey(r => r.ClassId)
                .OnDelete(DeleteBehavior.NoAction);

            // Cascade path fixes for Phase 4
            modelBuilder.Entity<Exam>()
                .HasOne(e => e.School)
                .WithMany()
                .HasForeignKey(e => e.SchoolId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Exam>()
                .HasOne(e => e.Class)
                .WithMany()
                .HasForeignKey(e => e.ClassId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Assignment>()
                .HasOne(a => a.School)
                .WithMany()
                .HasForeignKey(a => a.SchoolId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Assignment>()
                .HasOne(a => a.Class)
                .WithMany()
                .HasForeignKey(a => a.ClassId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<AssignmentSubmission>()
                .HasOne(s => s.Student)
                .WithMany()
                .HasForeignKey(s => s.StudentId)
                .OnDelete(DeleteBehavior.NoAction);

            // Multi-Tenancy Global Query Filters
            modelBuilder.Entity<Class>().HasQueryFilter(c => _userContext.Role == "SA" || c.SchoolId == _userContext.SchoolId);
            modelBuilder.Entity<Subject>().HasQueryFilter(s => _userContext.Role == "SA" || s.SchoolId == _userContext.SchoolId);
            modelBuilder.Entity<Register>().HasQueryFilter(r => _userContext.Role == "SA" || r.SchoolId == _userContext.SchoolId);
            modelBuilder.Entity<QuestionAnswer>().HasQueryFilter(q => _userContext.Role == "SA" || q.SchoolId == _userContext.SchoolId);
            modelBuilder.Entity<MCQs>().HasQueryFilter(m => _userContext.Role == "SA" || m.SchoolId == _userContext.SchoolId);
            modelBuilder.Entity<Result>().HasQueryFilter(r => _userContext.Role == "SA" || r.SchoolId == _userContext.SchoolId);
            modelBuilder.Entity<Attendance>().HasQueryFilter(a => _userContext.Role == "SA" || a.SchoolId == _userContext.SchoolId);
            modelBuilder.Entity<StudyMaterial>().HasQueryFilter(s => _userContext.Role == "SA" || s.SchoolId == _userContext.SchoolId);
            modelBuilder.Entity<Exam>().HasQueryFilter(e => _userContext.Role == "SA" || e.SchoolId == _userContext.SchoolId);
            modelBuilder.Entity<Assignment>().HasQueryFilter(a => _userContext.Role == "SA" || a.SchoolId == _userContext.SchoolId);
            modelBuilder.Entity<AssignmentSubmission>().HasQueryFilter(s => _userContext.Role == "SA" || s.SchoolId == _userContext.SchoolId);
            modelBuilder.Entity<UserBadge>().HasQueryFilter(ub => _userContext.Role == "SA" || ub.User.SchoolId == _userContext.SchoolId);
            modelBuilder.Entity<UserStreak>().HasQueryFilter(us => _userContext.Role == "SA" || us.User.SchoolId == _userContext.SchoolId);
            modelBuilder.Entity<Notification>().HasQueryFilter(n => _userContext.Role == "SA" || n.SchoolId == _userContext.SchoolId);
            modelBuilder.Entity<ChatMessage>().HasQueryFilter(c => _userContext.Role == "SA" || c.SchoolId == _userContext.SchoolId);
            modelBuilder.Entity<SchoolSettings>().HasQueryFilter(s => _userContext.Role == "SA" || s.SchoolId == _userContext.SchoolId);
        }
    }
}
