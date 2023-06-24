using Learning.Data;
using Learning.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Learning.Controllers
{
    public class ResultController : Controller
    {
        
        private readonly QuestionAPIDbcontext dbcontext;
        public ResultController(QuestionAPIDbcontext dbcontext)
        {
            this.dbcontext = dbcontext;
        }
        [HttpGet]
        [Route("Get-Result")]
        public async Task<IActionResult> Index()
        {
            var Register = dbcontext.Register.ToList();
            var QAMarks = dbcontext.QAMarks.ToList();
            var MCQmarks = dbcontext.MCQmarks.ToList();

            // Create an instance of ExamDataViewModel and populate it with the retrieved data
            var examDataViewModel = new Result
            {

                Register = Register,
                QAMarks = QAMarks,
                MCQmarks = MCQmarks
            };

            // Pass the view model to the view
            dbcontext.Result.Add(examDataViewModel);
            await dbcontext.SaveChangesAsync();
            return Ok(examDataViewModel);

        }
       


        // GET: /Exam/Index
        //public IActionResult Index()
        //{
        //    // Retrieve ExamData from the database
        //    Result examData = dbcontext.Result.FirstOrDefault();

        //    // Map ExamData to ExamDataViewModel
        //    ExamDataViewModel examDataViewModel = new ExamDataViewModel
        //    {
        //        Register = examData.Register,
        //        QAMarks = examData.QAMarks,
        //        MCQmarks = examData.MCQmarks
        //    };

        //    // Return the combined data to the view
        //    return Ok(examDataViewModel);
        //}

        //[HttpPost]
        //public IActionResult Save(ExamDataViewModel examDataViewModel)
        //{
        //    // Map ExamDataViewModel to ExamData
        //    Result examData = new Result
        //    {
        //        Register = examDataViewModel.Register,
        //        QAMarks = examDataViewModel.QAMarks,
        //        MCQmarks = examDataViewModel.MCQmarks
        //    };

        //    // Add or update ExamData in the database
        //    dbcontext.Result.Update(examData);
        //    // Or use Add() or Attach() methods based on your requirements

        //    // Save changes to the database
        //    dbcontext.SaveChanges();

        //    // Redirect to the Index action
        //    return RedirectToAction("Index");
        //}
        //[HttpPost]
        //public IActionResult SaveExamData(ExamDataViewModel examDataViewModel)
        //{
        //    Result examData = GetExamData();
        //    examData.Register = examDataViewModel.Register;
        //    examData.QAMarks = examDataViewModel.QAMarks;
        //    examData.MCQmarks = examDataViewModel.MCQmarks;

        //    // Add or update ExamData in the database
        //    // Or use Add() or Attach() methods based on your requirements

        //    // Save changes to the database
        //    dbcontext.SaveChanges();

        //    // Redirect to the Index action
        //    return RedirectToAction("Index");
        //}
    }
}
