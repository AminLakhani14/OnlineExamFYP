using System.Collections.Generic;
using System.Threading.Tasks;

namespace Learning.Services
{
    public interface IAIService
    {
        // AI will be implemented here later: Evaluate subjective answers
        Task<string> EvaluateAnswerAsync(string question, string studentAnswer);

        // AI will be implemented here later: Generate quiz from text
        Task<List<string>> GenerateQuizAsync(string content);

        // AI will be implemented here later: Provide student feedback
        Task<string> GetStudentFeedbackAsync(int studentId);
    }
}
