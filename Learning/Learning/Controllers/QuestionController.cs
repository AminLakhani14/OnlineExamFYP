using Learning.Data;
using Learning.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Learning.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class QuestionController : Controller
    {

        private readonly QuestionAPIDbcontext dbcontext;
        public QuestionController(QuestionAPIDbcontext dbcontext) {
            this.dbcontext = dbcontext;
        
        }

        [HttpGet]
        [Route("get-question")]
        public async Task<IActionResult> GetQuestion()
        {
            return Ok(dbcontext.QuestionAnswer.ToList());
        }

        //[HttpGet]
        //[Route("{id:guid")]

        //public async Task<IActionResult> GetQuestion([FromRoute] Guid ID)
        //{
        //    var question = await dbcontext.QuestionAnswer.FindAsync(ID);

        //    if(question == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(question);
        //}

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> AddQuestion(AddQuestion addQuestion)
        {
            var question = new QuestionAnswer()
            {
                ID = Guid.NewGuid(),
                Answer = addQuestion.Answer,
                Keyword1 = addQuestion.Keyword1,
                Keyword2 = addQuestion.Keyword2,
                Keyword3 = addQuestion.Keyword3,
                Keyword4 = addQuestion.Keyword4,
                Keyword5 = addQuestion.Keyword5,
                marks = addQuestion.marks,
                Question = addQuestion.Question,
                course = addQuestion.course,


            };
            await dbcontext.QuestionAnswer.AddAsync(question);
            await dbcontext.SaveChangesAsync();

            return Ok(question);

        }

        [HttpPut]
        [Route("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<IActionResult> UpdateQuestion([FromRoute] Guid id, UpdateQuestion updateQuestion)
        {
            var question = await dbcontext.QuestionAnswer.FindAsync(id);

            if(question != null) 
            {
                question.Question = updateQuestion.Question;
                question.Answer = updateQuestion.Answer;
                question.Keyword1 = updateQuestion.Keyword1;
                question.Keyword2 = updateQuestion.Keyword2;
                question.Keyword3 = updateQuestion.Keyword3;
                question.Keyword4 = updateQuestion.Keyword4;
                question.Keyword5 = updateQuestion.Keyword5;
                question.course = updateQuestion.course;
                question.marks = updateQuestion.marks;

                await dbcontext.SaveChangesAsync();
                return Ok(question);
            }
            return NotFound();
        }

        [HttpDelete]
        [Route("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteQuestion([FromRoute] Guid id)
        {
            var question = await dbcontext.QuestionAnswer.FindAsync(id);

            if(question != null)
            {
                dbcontext.Remove(question);
                await dbcontext.SaveChangesAsync();
                return Ok(question);
            }
            return NotFound();

        }


    }
}
