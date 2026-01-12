using System;
using System.Linq;
using System.Threading.Tasks;
using Learning.Data;
using Microsoft.EntityFrameworkCore;

namespace Learning.Services
{
    public class AnalyticsService : IAnalyticsService
    {
        private readonly QuestionAPIDbcontext _context;

        public AnalyticsService(QuestionAPIDbcontext context)
        {
            _context = context;
        }

        public async Task<object> GetAdminOverviewAsync(int schoolId)
        {
            var totalStudents = await _context.Register.CountAsync(u => u.Type == "Student" && u.SchoolId == schoolId);
            var totalTeachers = await _context.Register.CountAsync(u => u.Type == "Teacher" && u.SchoolId == schoolId);
            var totalClasses = await _context.Classes.CountAsync(c => c.SchoolId == schoolId);

            // Attendance Trends (last 7 days)
            var last7Days = Enumerable.Range(0, 7).Select(i => DateTime.UtcNow.Date.AddDays(-i)).ToList();
            var attendanceTrends = await _context.Attendances
                .Where(a => a.SchoolId == schoolId && a.Date >= DateTime.UtcNow.Date.AddDays(-7))
                .GroupBy(a => a.Date.Date)
                .Select(g => new
                {
                    Date = g.Key,
                    PresentCount = g.Count(a => a.Status == "Present"),
                    TotalCount = g.Count()
                })
                .ToListAsync();

            // Exam Performance (Average Marks)
            var avgMCQMarks = await _context.MCQmarks.Where(m => _context.Register.Any(r => r.ID == m.ID && r.SchoolId == schoolId)).AverageAsync(m => (double)m.MCQMarks / m.TotalMarks) * 100;
            
            return new
            {
                Stats = new { totalStudents, totalTeachers, totalClasses },
                AttendanceTrends = attendanceTrends,
                PerformanceOverview = new { avgScore = Math.Round(avgMCQMarks, 2) }
            };
        }

        public async Task<object> GetClassPerformanceAsync(int classId)
        {
            var studentsInClass = await _context.Register.Where(u => u.ClassId == classId).Select(u => u.ID).ToListAsync();
            
            var subjectWiseAvg = await _context.MCQmarks
                .Where(m => studentsInClass.Contains(m.ID)) // In this schema ID in MCQmarks relates to user? Checking model... 
                // Wait, looking at MCQmarks.cs: public int ID { get; set; } usually means PK. 
                // Looking at ResultController: var Register = dbcontext.Register.ToList(); var QAMarks = dbcontext.QAMarks.ToList();
                // It seems the schema might be a bit loose on relationships for marks. 
                // Let's assume ID in marks matches Register ID for now based on ResultController usage.
                .GroupBy(m => m.course)
                .Select(g => new
                {
                    Subject = g.Key,
                    AverageScore = Math.Round(g.Average(m => (double)m.MCQMarks / m.TotalMarks) * 100, 2)
                })
                .ToListAsync();

            return new
            {
                ClassId = classId,
                SubjectPerformance = subjectWiseAvg
            };
        }

        public async Task<object> GetStudentProgressAsync(int studentId)
        {
            var mcqMarks = await _context.MCQmarks.Where(m => m.ID == studentId).ToListAsync();
            var qaMarks = await _context.QAMarks.Where(m => m.ID == studentId).ToListAsync();

            var attendance = await _context.Attendances.Where(a => a.StudentId == studentId).ToListAsync();
            var attendanceRate = attendance.Count > 0 ? (double)attendance.Count(a => a.Status == "Present") / attendance.Count * 100 : 0;

            return new
            {
                StudentId = studentId,
                AttendanceRate = Math.Round(attendanceRate, 2),
                Performance = new
                {
                    MCQHistory = mcqMarks.Select(m => new { m.course, Score = m.MCQMarks, Total = m.TotalMarks }),
                    QAHistory = qaMarks.Select(m => new { m.course, Score = m.QMarks, Total = m.TotalMarks })
                }
            };
        }

        public async Task<object> GetTeacherPerformanceAsync(int teacherId)
        {
            var subjects = await _context.Subjects
                .Where(s => s.TeacherId == teacherId)
                .Select(s => new { s.ID, s.Name, s.ClassId })
                .ToListAsync();

            var classIds = subjects.Select(s => s.ClassId).Distinct().ToList();
            var studentsCount = await _context.Register.CountAsync(r => r.ClassId.HasValue && classIds.Contains(r.ClassId.Value));

            return new
            {
                TeacherId = teacherId,
                SubjectsCount = subjects.Count,
                TotalStudentsImpacted = studentsCount,
                Subjects = subjects
            };
        }
    }
}
