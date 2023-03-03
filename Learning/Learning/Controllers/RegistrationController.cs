using Learning.Data;
using Learning.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;

namespace Learning.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class RegistrationController : Controller
    {
        private readonly QuestionAPIDbcontext dbcontext;
        public RegistrationController(QuestionAPIDbcontext dbcontext)
        {
            this.dbcontext = dbcontext;
        }
        [HttpGet]
        [Route("Get-Register")]
        public async Task<IActionResult> GetRegister()
        {
            return Ok(dbcontext.Register.ToList());
        }

        [HttpPost]
        [Route("post-Register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> AddUser(AddUser AddUser)
        {
            var addData = new Register()
            {
                Type = AddUser.Type,
                UserName = AddUser.UserName,
                Age = AddUser.Age,
                Email = AddUser.Email,
                Password = AddUser.Password,
                Country = AddUser.Country,
                City = AddUser.City,



            };
            try
            {
             await dbcontext.Register.AddAsync(addData);
            await dbcontext.SaveChangesAsync();
                SendEmail(AddUser.Email,AddUser.UserName,AddUser.Password);
            }
            catch
            {
            }
            return Ok(addData);
        }

        [HttpPost]
        [Route("Login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Login(Login loginUser)
        {
            var userlogin = new Login()
            {
                UserName = loginUser.UserName,
                Password = loginUser.Password,
            };
            try
            {
                var data = dbcontext.Register.Where(x => x.UserName == userlogin.UserName && x.Password == userlogin.Password).FirstOrDefault();
                if (data != null)
                {
                    return Ok(data);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch
            {
                return BadRequest();

            }
        }

        public static bool SendEmail(string Emailto, string Usnername, string Password)
        {
            try
            {
                string SMTPMailAddress = "no-reply@surview.ae";
                string SMTPMailDisplayName = "Online Examination System";
                string SMTPClientHostAddress = "smtp.surview.ae";
                string SMTPPassword = "Demo@123!!";
                string SMTPUserID = "surview@mg.surview.ae";
                string emailbody = "<h1>your username</h1>" + Usnername + "<h1>your password</h1>" + Password;
                //using (MailMessage mail = new MailMessage())
                //{
                //    mail.From = new MailAddress(SMTPMailAddress);
                //    mail.To.Add(Emailto);
                //    mail.Subject = "Your login Credintial";
                //    mail.Body = emailbody;
                //    mail.IsBodyHtml = true;
                //    //mail.Attachments.Add(new Attachment("D:\\TestFile.txt"));//--Uncomment this to send any attachment  
                //    using (SmtpClient smtp = new SmtpClient("smtp-relay.gmail.com", 587))
                //    {
                //        smtp.Credentials = new NetworkCredential(SMTPMailAddress, SMTPPassword);
                //        smtp.EnableSsl = true;
                //        smtp.Send(mail);
                //    }
                //}
                using (MailMessage mail = new MailMessage(new MailAddress("aminlakhani254@gmail.com", ""),
                        new MailAddress(Emailto, "")))
                {
                    string EmailHTML = @"";
                    //mail.From = new MailAddress(fromEmail,fromName);
                    //mail.To.Add(dr["EmailAddress"].ToString());
                    mail.Subject = "Your login Credintial";
                    mail.Body = emailbody;
                    mail.IsBodyHtml = true;
                    using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                    {
                        smtp.Credentials = new NetworkCredential(SMTPMailAddress, SMTPPassword);
                        smtp.EnableSsl = true;
                        smtp.Send(mail);

                    }
                }
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }
    }
}
