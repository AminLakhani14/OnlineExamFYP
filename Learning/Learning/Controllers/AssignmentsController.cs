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
    public class AssignmentsController : ControllerBase
    {
        private readonly QuestionAPIDbcontext _context;
        private readonly ICurrentUserContext _userContext;

        public AssignmentsController(QuestionAPIDbcontext context, ICurrentUserContext userContext)
        {
            _context = context;
            _userContext = userContext;
        }

        // GET: api/Assignments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Assignment>>> GetAssignments(int? classId)
        {
            var query = _context.Assignments.AsQueryable();

            if (classId.HasValue) query = query.Where(a => a.ClassId == classId);

            return await query
                .Include(a => a.Subject)
                .Include(a => a.Class)
                .ToListAsync();
        }

        // POST: api/Assignments
        [HttpPost]
        public async Task<ActionResult<Assignment>> PostAssignment(Assignment assignment)
        {
            if (_userContext.Role != "SA")
            {
                assignment.SchoolId = _userContext.SchoolId;
            }
            assignment.TeacherId = _userContext.UserId;

            _context.Assignments.Add(assignment);
            await _context.SaveChangesAsync();

            return Ok(assignment);
        }

        // POST: api/Assignments/submit
        [HttpPost("submit")]
        public async Task<IActionResult> SubmitAssignment(AssignmentSubmission submission)
        {
            if (_userContext.Role != "SA")
            {
                submission.SchoolId = _userContext.SchoolId;
            }
            submission.StudentId = _userContext.UserId;
            submission.SubmissionDate = DateTime.UtcNow;

            _context.AssignmentSubmissions.Add(submission);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // GET: api/Assignments/submissions/5
        [HttpGet("submissions/{assignmentId}")]
        public async Task<ActionResult<IEnumerable<AssignmentSubmission>>> GetSubmissions(int assignmentId)
        {
            return await _context.AssignmentSubmissions
                .Where(s => s.AssignmentId == assignmentId)
                .Include(s => s.Student)
                .ToListAsync();
        }

        // PUT: api/Assignments/grade
        [HttpPut("grade/{submissionId}")]
        public async Task<IActionResult> GradeSubmission(int submissionId, [FromBody] int marks, string remarks)
        {
            var submission = await _context.AssignmentSubmissions.FindAsync(submissionId);
            if (submission == null) return NotFound();

            submission.MarksObtained = marks;
            submission.TeacherRemarks = remarks;

            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
