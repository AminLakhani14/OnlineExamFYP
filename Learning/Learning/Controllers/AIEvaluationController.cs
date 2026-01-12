using Microsoft.AspNetCore.Mvc;
using Learning.Services;
using Learning.Models;
using Learning.Data;
using Microsoft.AspNetCore.Authorization;
using System.Text.Json;

namespace Learning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AIEvaluationController : ControllerBase
    {
        private readonly IAIService _aiService;
        private readonly QuestionAPIDbcontext _context;

        public AIEvaluationController(IAIService aiService, QuestionAPIDbcontext context)
        {
            _aiService = aiService;
            _context = context;
        }

        [HttpPost("evaluate-answer")]
        public async Task<IActionResult> EvaluateAnswer([FromBody] EvaluationRequest request)
        {
            var resultJson = await _aiService.EvaluateAnswerAsync(request.Question, request.StudentAnswer);
            
            try 
            {
                var evaluation = JsonSerializer.Deserialize<AIEvaluationResult>(resultJson);
                return Ok(evaluation);
            }
            catch
            {
                return Ok(new { score = 0, feedback = "AI failed to produce valid JSON: " + resultJson });
            }
        }

        [HttpPost("generate-quiz")]
        public async Task<IActionResult> GenerateQuiz([FromBody] string content)
        {
            var questions = await _aiService.GenerateQuizAsync(content);
            return Ok(questions);
        }

        [HttpGet("student-performance-feedback/{studentId}")]
        public async Task<IActionResult> GetPerformanceFeedback(int studentId)
        {
            var feedback = await _aiService.GetStudentFeedbackAsync(studentId);
            return Ok(new { feedback });
        }
    }

    public class EvaluationRequest
    {
        public string Question { get; set; }
        public string StudentAnswer { get; set; }
    }

    public class AIEvaluationResult
    {
        public int score { get; set; }
        public string feedback { get; set; }
    }
}
