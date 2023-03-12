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
                SendEmail(AddUser.Email,AddUser.UserName,AddUser.Password,AddUser.Type);
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
                Type=loginUser.Type,
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

        public static bool SendEmail(string Emailto, string Usnername, string Password, string Type)
        {
            try
            {
                string SMTPMailAddress = "no-reply@surview.ae";
                string SMTPMailDisplayName = "Online Examination System";
                string SMTPClientHostAddress = "smtp.surview.ae";
                string SMTPPassword = "Demo@123!!";
                string SMTPUserID = "surview@mg.surview.ae";
                string emailbody = "<table style='width: 43.9%; height: 100%; font-family: Roboto; border-collapse: collapse; min-width: 442px; '><tr style='height: 64px; background-color: rgb(233,233,233); border-bottom: 1px solid rgba(39, 60, 65, 0.5);'><td style='width: 50px; padding-left: 22px; '><img src='https://upload.wikimedia.org/wikipedia/commons/4/43/Iqra_University_logo.png' alt='' height='40px' width='150px' style='padding-top: 0px;'></td><td style='padding-left: 3px; width: 70px;'><h1 style='padding-top: 2px; font-family: Roboto; margin: 0px; color: #273C41; font-style: normal; font-weight: 300; font-size: 26px; letter-spacing: -0.5px;'>Online</h1></td><td style='padding-left: 1px;'><p style='padding-top: 10.5px; font-family: Roboto; margin: 0px; color: #506165;'>Examination System</p></td></tr></table>" +
                   "<h3 style='display: contents; '>This username and password is for</h3>" + " " + Type + "<h3>your username</h3>" + Usnername + "<h3>your password</h3>" + Password;
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
