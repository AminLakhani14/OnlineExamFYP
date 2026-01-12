using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Learning.Services
{
    public class AIService : IAIService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly string _model = "gemini-1.5-flash";

        public AIService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _apiKey = configuration["Gemini:ApiKey"];
        }

        public async Task<string> EvaluateAnswerAsync(string question, string studentAnswer)
        {
            if (string.IsNullOrEmpty(_apiKey) || _apiKey == "YOUR_GEMINI_API_KEY_HERE")
                return "{\"score\": 0, \"feedback\": \"AI service not configured. Please add Gemini API Key.\"}";

            var prompt = $"You are an expert teacher. Evaluate the following student answer for the given question. " +
                         $"Provide a score out of 10 and a brief feedback. " +
                         $"Return ONLY a valid JSON object with keys 'score' (number) and 'feedback' (string). " +
                         $"\nQuestion: {question} \nStudent Answer: {studentAnswer}";

            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new[]
                        {
                            new { text = prompt }
                        }
                    }
                }
            };

            var response = await _httpClient.PostAsync(
                $"https://generativelanguage.googleapis.com/v1beta/models/{_model}:generateContent?key={_apiKey}",
                new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json")
            );

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                return $"{{\"score\": 0, \"feedback\": \"AI Error: {response.StatusCode}\"}}";
            }

            var jsonResponse = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(jsonResponse);
            var resultText = doc.RootElement
                .GetProperty("candidates")[0]
                .GetProperty("content")
                .GetProperty("parts")[0]
                .GetProperty("text")
                .GetString();

            return ExtractJson(resultText);
        }

        public async Task<List<string>> GenerateQuizAsync(string content)
        {
            if (string.IsNullOrEmpty(_apiKey) || _apiKey == "YOUR_GEMINI_API_KEY_HERE")
                return new List<string> { "AI service not configured." };

            var prompt = $"Based on the following content, generate 5 multiple-choice questions. " +
                         $"For each question, provide 4 options (A, B, C, D) and the correct answer. " +
                         $"Return ONLY a valid JSON array of objects. Each object should have keys: " +
                         $"'question', 'optionA', 'optionB', 'optionC', 'optionD', 'correctAnswer' (string representing the option, e.g., 'A'). " +
                         $"\nContent: {content}";

            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new[]
                        {
                            new { text = prompt }
                        }
                    }
                }
            };

            var response = await _httpClient.PostAsync(
                $"https://generativelanguage.googleapis.com/v1beta/models/{_model}:generateContent?key={_apiKey}",
                new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json")
            );

            if (!response.IsSuccessStatusCode)
                return new List<string> { $"AI Error: {response.StatusCode}" };

            var jsonResponse = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(jsonResponse);
            var resultText = doc.RootElement
                .GetProperty("candidates")[0]
                .GetProperty("content")
                .GetProperty("parts")[0]
                .GetProperty("text")
                .GetString();

            resultText = ExtractJson(resultText);

            try
            {
                // In a production app, we'd deserialize to a proper object. 
                // For now, we return the string representation of the array.
                return new List<string> { resultText };
            }
            catch
            {
                return new List<string> { "Failed to parse AI generated quiz." };
            }
        }

        public async Task<string> GetStudentFeedbackAsync(int studentId)
        {
            // This would ideally fetch student results from DB and send them to Gemini
            return "Based on your recent performance in MCQs (90%) but lower score in Subjective (60%), you should focus on detail-oriented answers and keyword usage.";
        }

        private string ExtractJson(string text)
        {
            if (text.Contains("```json"))
            {
                return text.Split("```json")[1].Split("```")[0].Trim();
            }
            if (text.Contains("```"))
            {
                return text.Split("```")[1].Split("```")[0].Trim();
            }
            return text.Trim();
        }
    }
}
