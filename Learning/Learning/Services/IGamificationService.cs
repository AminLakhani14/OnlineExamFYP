using System.Threading.Tasks;
using Learning.Models;

namespace Learning.Services
{
    public interface IGamificationService
    {
        Task AwardXPAsync(int userId, int amount, string reason);
        Task UpdateStreakAsync(int userId);
        Task CheckAndAwardBadgesAsync(int userId);
        Task<object> GetUserStatsAsync(int userId);
        Task SeedBadgesAsync();
        Task<object> GetLeaderboardAsync(int userId);
    }
}
