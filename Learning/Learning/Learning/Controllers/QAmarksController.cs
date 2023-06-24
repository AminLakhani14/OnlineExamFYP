using Learning.Data;
using Learning.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Learning.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class QAmarksController : Controller
    {
        private readonly QuestionAPIDbcontext dbcontext;
        public QAmarksController(QuestionAPIDbcontext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        [HttpGet]
        [Route("Get-QAMarks")]
        public async Task<IActionResult> GeQAMarks()
        {
            var data = await dbcontext.QAMarks.Include(x => x.Register).ToListAsync();
            return Ok(data);
        }

        [HttpPost]
        [Route("Post-QAMarks")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Marks(AddQAMarks MARKS)
        {
            var register = await dbcontext.Register.FindAsync(MARKS.RegisterID);

            if (register == null)
            {
                return BadRequest("Invalid Register ID.");
            }
            var question = new QAMarks()
            {
                ID = Guid.NewGuid(),
                RegisterID = MARKS.RegisterID,
                QMarks = MARKS.QMarks,
                TotalMarks = MARKS.TotalMarks,
                course = MARKS.course,
            };
            await dbcontext.QAMarks.AddAsync(question);
            await dbcontext.SaveChangesAsync();

            return Ok(question);

        }

        [HttpGet]
        [Route("Get-MCQsMarks")]
        public async Task<IActionResult> GeMCQMarks()
        {
            var data = await dbcontext.MCQmarks.Include(x => x.Register).ToListAsync();
            return Ok(data);
        }

        [HttpPost]
        [Route("Post-MCQsMarks")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> MCQMark(AddMCQmarks marks)
        {
            var register = await dbcontext.Register.FindAsync(marks.RegisterID);

            if (register == null)
            {
                return BadRequest("Invalid Register ID.");
            }

            var data = new MCQmarks()
            {
                ID = Guid.NewGuid(),
                RegisterID = marks.RegisterID,
                MCQMarks = marks.MCQMarks,
                TotalMarks = marks.TotalMarks,
                course = marks.course,
            };
            await dbcontext.MCQmarks.AddAsync(data);
            await dbcontext.SaveChangesAsync();

            return Ok(data);

        }
    }
}
