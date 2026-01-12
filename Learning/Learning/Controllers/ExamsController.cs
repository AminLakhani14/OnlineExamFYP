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
    public class ExamsController : ControllerBase
    {
        private readonly QuestionAPIDbcontext _context;
        private readonly ICurrentUserContext _userContext;

        public ExamsController(QuestionAPIDbcontext context, ICurrentUserContext userContext)
        {
            _context = context;
            _userContext = userContext;
        }

        // GET: api/Exams
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Exam>>> GetExams(int? classId)
        {
            var query = _context.Exams.AsQueryable();

            if (classId.HasValue)
            {
                query = query.Where(e => e.ClassId == classId);
            }

            // If teacher, only show their exams
            if (_userContext.Role == "Teacher")
            {
                query = query.Where(e => e.TeacherId == _userContext.UserId);
            }

            return await query
                .Include(e => e.Class)
                .Include(e => e.Subject)
                .Include(e => e.Questions)
                .ToListAsync();
        }

        // POST: api/Exams
        [HttpPost]
        public async Task<ActionResult<Exam>> PostExam(Exam exam)
        {
            if (_userContext.Role != "SA")
            {
                exam.SchoolId = _userContext.SchoolId;
            }
            exam.TeacherId = _userContext.UserId;

            _context.Exams.Add(exam);
            await _context.SaveChangesAsync();

            return Ok(exam);
        }

        // GET: api/Exams/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Exam>> GetExam(int id)
        {
            var exam = await _context.Exams
                .Include(e => e.Questions)
                .ThenInclude(q => q.MCQ)
                .Include(e => e.Questions)
                .ThenInclude(q => q.QA)
                .FirstOrDefaultAsync(e => e.ID == id);

            if (exam == null) return NotFound();

            return exam;
        }
    }
}
