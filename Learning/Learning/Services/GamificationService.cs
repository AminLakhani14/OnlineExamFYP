using System;
using System.Linq;
using System.Threading.Tasks;
using Learning.Data;
using Learning.Models;
using Microsoft.EntityFrameworkCore;

namespace Learning.Services
{
    public class GamificationService : IGamificationService
    {
        private readonly QuestionAPIDbcontext _context;

        public GamificationService(QuestionAPIDbcontext context)
        {
            _context = context;
        }

        public async Task AwardXPAsync(int userId, int amount, string reason)
        {
            var user = await _context.Register.FindAsync(userId);
            if (user == null) return;

            user.XP += amount;
            user.TotalPoints += amount;

            // Simple level logic: every 1000 XP is a level
            user.Level = (user.XP / 1000) + 1;

            await _context.SaveChangesAsync();
            await CheckAndAwardBadgesAsync(userId);
        }

        public async Task UpdateStreakAsync(int userId)
        {
            var streak = await _context.UserStreaks.FirstOrDefaultAsync(s => s.UserId == userId);
            var today = DateTime.UtcNow.Date;

            if (streak == null)
            {
                streak = new UserStreak
                {
                    UserId = userId,
                    CurrentStreak = 1,
                    LongestStreak = 1,
                    LastActivityDate = today
                };
                _context.UserStreaks.Add(streak);
            }
            else
            {
                var lastDate = streak.LastActivityDate.Date;
                if (lastDate == today) return; // Already updated today

                if (lastDate == today.AddDays(-1))
                {
                    streak.CurrentStreak += 1;
                    if (streak.CurrentStreak > streak.LongestStreak)
                    {
                        streak.LongestStreak = streak.CurrentStreak;
                    }
                }
                else
                {
                    streak.CurrentStreak = 1;
                }
                streak.LastActivityDate = today;
            }

            await _context.SaveChangesAsync();
            await CheckAndAwardBadgesAsync(userId);
        }

        public async Task CheckAndAwardBadgesAsync(int userId)
        {
            var user = await _context.Register.Include(u => u.Class).FirstOrDefaultAsync(u => u.ID == userId);
            if (user == null) return;

            var existingBadges = await _context.UserBadges.Where(ub => ub.UserId == userId).Select(ub => ub.BadgeId).ToListAsync();
            var allBadges = await _context.Badges.ToListAsync();

            foreach (var badge in allBadges)
            {
                if (existingBadges.Contains(badge.Id)) continue;

                bool shouldAward = false;

                switch (badge.CriteriaType)
                {
                    case "Level":
                        if (user.Level >= badge.CriteriaValue) shouldAward = true;
                        break;
                    case "XP":
                        if (user.XP >= badge.CriteriaValue) shouldAward = true;
                        break;
                    case "Streak":
                        var streak = await _context.UserStreaks.FirstOrDefaultAsync(s => s.UserId == userId);
                        if (streak != null && streak.CurrentStreak >= badge.CriteriaValue) shouldAward = true;
                        break;
                }

                if (shouldAward)
                {
                    _context.UserBadges.Add(new UserBadge
                    {
                        UserId = userId,
                        BadgeId = badge.Id,
                        EarnedAt = DateTime.UtcNow
                    });
                }
            }

            await _context.SaveChangesAsync();
        }

        public async Task<object> GetUserStatsAsync(int userId)
        {
            var user = await _context.Register.FindAsync(userId);
            var streak = await _context.UserStreaks.FirstOrDefaultAsync(s => s.UserId == userId);
            var badges = await _context.UserBadges
                .Where(ub => ub.UserId == userId)
                .Include(ub => ub.Badge)
                .Select(ub => new { ub.Badge.Name, ub.Badge.Description, ub.Badge.Icon, ub.EarnedAt })
                .ToListAsync();

            return new
            {
                Level = user?.Level ?? 1,
                XP = user?.XP ?? 0,
                NextLevelXP = ((user?.Level ?? 1) * 1000),
                TotalPoints = user?.TotalPoints ?? 0,
                CurrentStreak = streak?.CurrentStreak ?? 0,
                LongestStreak = streak?.LongestStreak ?? 0,
                BadgesCount = badges.Count,
                Badges = badges
            };
        }

        public async Task SeedBadgesAsync()
        {
            if (await _context.Badges.AnyAsync()) return;

            _context.Badges.AddRange(new[]
            {
                new Badge { Name = "Newbie", Description = "Reached Level 1", Icon = "star", CriteriaType = "Level", CriteriaValue = 1 },
                new Badge { Name = "Scholar", Description = "Reached Level 5", Icon = "school", CriteriaType = "Level", CriteriaValue = 5 },
                new Badge { Name = "Master", Description = "Reached Level 10", Icon = "workspace_premium", CriteriaType = "Level", CriteriaValue = 10 },
                new Badge { Name = "Consistent Learner", Description = "3 Day Streak", Icon = "local_fire_department", CriteriaType = "Streak", CriteriaValue = 3 },
                new Badge { Name = "Dedicated Student", Description = "7 Day Streak", Icon = "military_tech", CriteriaType = "Streak", CriteriaValue = 7 },
                new Badge { Name = "XP Collector", Description = "Earned 1000 XP", Icon = "military_tech", CriteriaType = "XP", CriteriaValue = 1000 }
            });

            await _context.SaveChangesAsync();
        }

        public async Task<object> GetLeaderboardAsync(int userId)
        {
            var user = await _context.Register.FindAsync(userId);
            if (user == null) return null;

            var topUsers = await _context.Register
                .Where(u => u.Type == "Student" && u.SchoolId == user.SchoolId)
                .OrderByDescending(u => u.XP)
                .Take(10)
                .Select(u => new { u.ID, u.UserName, u.XP, u.Level })
                .ToListAsync();

            var userRank = await _context.Register
                .Where(u => u.Type == "Student" && u.SchoolId == user.SchoolId && u.XP > user.XP)
                .CountAsync() + 1;

            return new
            {
                TopUsers = topUsers,
                CurrentUserRank = userRank,
                CurrentUserXP = user.XP
            };
        }
    }
}
