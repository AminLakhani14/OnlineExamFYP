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
    public class SubjectsController : ControllerBase
    {
        private readonly QuestionAPIDbcontext _context;
        private readonly ICurrentUserContext _userContext;

        public SubjectsController(QuestionAPIDbcontext context, ICurrentUserContext userContext)
        {
            _context = context;
            _userContext = userContext;
        }

        // GET: api/Subjects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subject>>> GetSubjects(int? classId, int? schoolId)
        {
            var query = _context.Subjects.AsQueryable();

            if (classId.HasValue) query = query.Where(s => s.ClassId == classId);
            if (schoolId.HasValue) query = query.Where(s => s.SchoolId == schoolId);

            return await query.ToListAsync();
        }

        // POST: api/Subjects
        [HttpPost]
        public async Task<ActionResult<Subject>> PostSubject(Subject subject)
        {
            if (_userContext.Role != "SA")
            {
                subject.SchoolId = _userContext.SchoolId;
            }

            _context.Subjects.Add(subject);
            await _context.SaveChangesAsync();

            return Ok(subject);
        }

        // Assign a teacher to a subject
        [HttpPut("{id}/assign-teacher")]
        public async Task<IActionResult> AssignTeacher(int id, [FromBody] int teacherId)
        {
            var subject = await _context.Subjects.FindAsync(id);
            if (subject == null) return NotFound();

            var teacher = await _context.Register.FindAsync(teacherId);
            if (teacher == null || teacher.Type != "Teacher") return BadRequest("Invalid Teacher");

            subject.TeacherId = teacherId;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
