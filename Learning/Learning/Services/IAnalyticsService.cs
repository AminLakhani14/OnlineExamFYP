using System.Collections.Generic;
using System.Threading.Tasks;

namespace Learning.Services
{
    public interface IAnalyticsService
    {
        Task<object> GetAdminOverviewAsync(int schoolId);
        Task<object> GetClassPerformanceAsync(int classId);
        Task<object> GetStudentProgressAsync(int studentId);
        Task<object> GetTeacherPerformanceAsync(int teacherId);
    }
}
