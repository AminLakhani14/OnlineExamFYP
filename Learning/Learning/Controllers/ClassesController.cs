using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Learning.Data;
using Learning.Models;
using Microsoft.AspNetCore.Authorization;
using Learning.Services;

namespace Learning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ClassesController : ControllerBase
    {
        private readonly QuestionAPIDbcontext _context;
        private readonly ICurrentUserContext _userContext;

        public ClassesController(QuestionAPIDbcontext context, ICurrentUserContext userContext)
        {
            _context = context;
            _userContext = userContext;
        }

        // GET: api/Classes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Class>>> GetClasses(int? schoolId)
        {
            if (schoolId.HasValue)
            {
                return await _context.Classes.Where(c => c.SchoolId == schoolId).ToListAsync();
            }
            return await _context.Classes.ToListAsync();
        }

        // GET: api/Classes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Class>> GetClass(int id)
        {
            var @class = await _context.Classes.FindAsync(id);

            if (@class == null)
            {
                return NotFound();
            }

            return @class;
        }

        // POST: api/Classes
        [HttpPost]
        public async Task<ActionResult<Class>> PostClass(Class @class)
        {
            if (_userContext.Role != "SA")
            {
                @class.SchoolId = _userContext.SchoolId;
            }
            
            _context.Classes.Add(@class);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClass", new { id = @class.ID }, @class);
        }

        // DELETE: api/Classes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClass(int id)
        {
            var @class = await _context.Classes.FindAsync(id);
            if (@class == null)
            {
                return NotFound();
            }

            _context.Classes.Remove(@class);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
