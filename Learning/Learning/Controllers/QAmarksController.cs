using Learning.Data;
using Learning.Models;
using Microsoft.AspNetCore.Mvc;
using Learning.Services;

namespace Learning.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    [Microsoft.AspNetCore.Authorization.Authorize]
    public class QAmarksController : Controller
    {
        private readonly QuestionAPIDbcontext dbcontext;
        private readonly IGamificationService _gamificationService;
        private readonly INotificationService _notificationService;

        public QAmarksController(QuestionAPIDbcontext dbcontext, IGamificationService gamificationService, INotificationService notificationService)
        {
            this.dbcontext = dbcontext;
            _gamificationService = gamificationService;
            _notificationService = notificationService;
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

            // Award XP (10 XP per mark)
            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (userId != 0)
            {
                await _gamificationService.AwardXPAsync(userId, question.QMarks * 10, "Exam Performance");
                await _notificationService.SendNotificationAsync(userId, "Exam Result Posted", $"Your marks for {question.course} have been posted: {question.QMarks}/{question.TotalMarks}", "ExamResult", "/Result/Result");
            }

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

            // Award XP (20 XP per MCQ mark)
            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (userId != 0)
            {
                await _gamificationService.AwardXPAsync(userId, data.MCQMarks * 20, "MCQ Exam Performance");
                await _notificationService.SendNotificationAsync(userId, "MCQ Result Posted", $"Your MCQ marks for {data.course} have been posted: {data.MCQMarks}/{data.TotalMarks}", "ExamResult", "/Result/Result");
            }

            return Ok(data);

        }
    }
}
