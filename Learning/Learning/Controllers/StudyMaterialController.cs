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
    public class StudyMaterialController : ControllerBase
    {
        private readonly QuestionAPIDbcontext _context;
        private readonly ICurrentUserContext _userContext;

        public StudyMaterialController(QuestionAPIDbcontext context, ICurrentUserContext userContext)
        {
            _context = context;
            _userContext = userContext;
        }

        // GET: api/StudyMaterial
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudyMaterial>>> GetMaterials(int? classId, int? subjectId)
        {
            var query = _context.StudyMaterials.AsQueryable();

            if (classId.HasValue) query = query.Where(m => m.ClassId == classId);
            if (subjectId.HasValue) query = query.Where(m => m.SubjectId == subjectId);

            return await query.ToListAsync();
        }

        // POST: api/StudyMaterial
        [HttpPost]
        public async Task<ActionResult<StudyMaterial>> PostMaterial(StudyMaterial material)
        {
            if (_userContext.Role != "SA")
            {
                material.SchoolId = _userContext.SchoolId;
            }
            material.TeacherId = _userContext.UserId;
            material.UploadDate = DateTime.UtcNow;

            _context.StudyMaterials.Add(material);
            await _context.SaveChangesAsync();

            return Ok(material);
        }

        // DELETE: api/StudyMaterial/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaterial(int id)
        {
            var material = await _context.StudyMaterials.FindAsync(id);
            if (material == null) return NotFound();

            _context.StudyMaterials.Remove(material);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
