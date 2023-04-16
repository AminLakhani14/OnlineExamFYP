using Learning.Data;
using Learning.Models;
using Microsoft.AspNetCore.Mvc;

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
            return Ok(dbcontext.QAMarks.ToList());
        }

        [HttpPost]
        [Route("Post-QAMarks")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Marks(AddQAMarks MARKS)
        {
            var question = new QAMarks()
            {
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
            return Ok(dbcontext.MCQmarks.ToList());
        }

        [HttpPost]
        [Route("Post-MCQsMarks")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> MCQMark(AddMCQmarks marks)
        {
            var data = new MCQmarks()
            {
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
