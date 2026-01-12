using Microsoft.AspNetCore.Mvc;
using Learning.Data;
using Learning.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Learning.Services;

namespace Learning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "SA,Admin")]
    public class TenantController : ControllerBase
    {
        private readonly QuestionAPIDbcontext _context;
        private readonly ICurrentUserContext _userContext;

        public TenantController(QuestionAPIDbcontext context, ICurrentUserContext userContext)
        {
            _context = context;
            _userContext = userContext;
        }

        [HttpGet("settings")]
        public async Task<IActionResult> GetSettings()
        {
            var settings = await _context.SchoolSettings.FirstOrDefaultAsync();
            if (settings == null)
            {
                settings = new SchoolSettings { SchoolId = _userContext.SchoolId };
                _context.SchoolSettings.Add(settings);
                await _context.SaveChangesAsync();
            }
            return Ok(settings);
        }

        [HttpPost("settings")]
        public async Task<IActionResult> UpdateSettings([FromBody] SchoolSettings settings)
        {
            var existing = await _context.SchoolSettings.FirstOrDefaultAsync();
            if (existing == null)
            {
                settings.SchoolId = _userContext.SchoolId;
                _context.SchoolSettings.Add(settings);
            }
            else
            {
                existing.PrimaryColor = settings.PrimaryColor;
                existing.SecondaryColor = settings.SecondaryColor;
                existing.LogoPath = settings.LogoPath;
                existing.PassingPercentage = settings.PassingPercentage;
                existing.GradingSystem = settings.GradingSystem;
                existing.EnableGamification = settings.EnableGamification;
                existing.EnableAIQuizzes = settings.EnableAIQuizzes;
            }
            
            await _context.SaveChangesAsync();
            return Ok(existing ?? settings);
        }
    }
}
