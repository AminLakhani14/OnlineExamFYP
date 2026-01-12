using Microsoft.AspNetCore.Mvc;
using Learning.Services;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System;

namespace Learning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GamificationController : ControllerBase
    {
        private readonly IGamificationService _gamificationService;

        public GamificationController(IGamificationService gamificationService)
        {
            _gamificationService = gamificationService;
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (userId == 0) return Unauthorized();

            var stats = await _gamificationService.GetUserStatsAsync(userId);
            return Ok(stats);
        }

        [HttpPost("update-streak")]
        public async Task<IActionResult> UpdateStreak()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (userId == 0) return Unauthorized();

            await _gamificationService.UpdateStreakAsync(userId);
            return Ok(new { message = "Streak updated" });
        }

        [HttpPost("seed-badges")]
        [AllowAnonymous] // Allow seeding badges without auth for dev
        public async Task<IActionResult> SeedBadges()
        {
            await _gamificationService.SeedBadgesAsync();
            return Ok(new { message = "Badges seeded" });
        }

        [HttpGet("leaderboard")]
        public async Task<IActionResult> GetLeaderboard()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (userId == 0) return Unauthorized();

            var leaderboard = await _gamificationService.GetLeaderboardAsync(userId);
            return Ok(leaderboard);
        }

        [HttpPost("award-xp")]
        public async Task<IActionResult> AwardXP([FromBody] AwardXPRequest request)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (userId == 0) return Unauthorized();

            await _gamificationService.AwardXPAsync(userId, request.Amount, request.Reason);
            return Ok(new { message = "XP awarded" });
        }
    }

    public class AwardXPRequest
    {
        public int Amount { get; set; }
        public string Reason { get; set; }
    }
}
