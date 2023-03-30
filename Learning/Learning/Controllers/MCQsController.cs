using Learning.Data;
using Learning.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Learning.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class MCQsController : Controller
    {
        private readonly QuestionAPIDbcontext dbcontext;

        public MCQsController(QuestionAPIDbcontext dbcontext)
        {
            this.dbcontext = dbcontext;
        }
        // GET: api/Mcqs
        [HttpGet]
        [Route("Get-MCQs")]
        public async Task<IActionResult> GetMcqs()
        {
            return Ok(dbcontext.MCQs.ToList());
        }


        [HttpPost]
        [Route("post-MCQs")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> PostMcq(AddMcqs AddMcqs)
        {
            var question = new MCQs()
            {
                Question = AddMcqs.Question,
                OptionA = AddMcqs.OptionA,
                OptionB = AddMcqs.OptionB,
                OptionC = AddMcqs.OptionC,
                OptionD = AddMcqs.OptionD,
                CorrectAnswer = AddMcqs.CorrectAnswer,
                course = AddMcqs.course,
                marks = AddMcqs.marks,


        };
            await dbcontext.MCQs.AddAsync(question);
            await dbcontext.SaveChangesAsync();

            return Ok(question);
        }

        [HttpPut]
        [Route("{Id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateMcq([FromRoute] int Id, UpdateMcqs UpdateMcqs)
        {
            var question = await dbcontext.MCQs.FindAsync(Id);

            if (question != null)
            {
                question.Question = UpdateMcqs.Question;
                question.OptionA = UpdateMcqs.OptionA;
                question.OptionB = UpdateMcqs.OptionB;
                question.OptionC = UpdateMcqs.OptionC;
                question.OptionD = UpdateMcqs.OptionD;
                question.CorrectAnswer = UpdateMcqs.CorrectAnswer;
                question.course = UpdateMcqs.course;
                question.marks = UpdateMcqs.marks;

                await dbcontext.SaveChangesAsync();
                return Ok(question);
            }
            return NotFound();
        }

        [HttpDelete]
        [Route("{Id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteQuestion([FromRoute] int Id)
        {
            var question = await dbcontext.MCQs.FindAsync(Id);

            if (question != null)
            {
                dbcontext.Remove(question);
                await dbcontext.SaveChangesAsync();
                return Ok(question);
            }
            return NotFound();

        }
    }

}
