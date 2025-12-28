using Learning.Data;
using Learning.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Learning.Services;

namespace Learning.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class RegistrationController : Controller
    {
        private readonly QuestionAPIDbcontext dbcontext;
        private readonly IConfiguration _config;
        private readonly IGamificationService _gamificationService;

        public RegistrationController(QuestionAPIDbcontext dbcontext, IConfiguration config, IGamificationService gamificationService)
        {
            this.dbcontext = dbcontext;
            _config = config;
            _gamificationService = gamificationService;
        }

        private string GenerateJwtToken(Register user)
        {
            var jwtSettings = _config.GetSection("Jwt");
            var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.ID.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Type),
                new Claim("SchoolId", user.SchoolId?.ToString() ?? "0")
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                Issuer = jwtSettings["Issuer"],
                Audience = jwtSettings["Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        [HttpGet]
        [Route("Get-Register")]
        public async Task<IActionResult> GetRegister()
        {
            return Ok(dbcontext.Register.ToList());
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await dbcontext.Register.FindAsync(id);
            if (user == null) return NotFound();
            return Ok(user);
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
                
                // Wrap email in its own try-catch so it doesn't fail the request if email fails
                try {
                    SendEmail(AddUser.Email, AddUser.UserName, AddUser.Password, AddUser.Type);
                } catch (Exception ex) {
                    // Log email failure but don't fail the user creation
                    Console.WriteLine("Email failed: " + ex.Message);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error: " + ex.Message + " | Inner: " + ex.InnerException?.Message);
            }
            return Ok(addData);
        }

        [HttpPost]
        [Route("Login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Login(Login loginUser)
        {
            // Auto-create admin if not exists
            if (loginUser.UserName == "admin@gmail.com")
            {
                var admin = dbcontext.Register.IgnoreQueryFilters().FirstOrDefault(x => x.UserName == "admin@gmail.com");
                if (admin == null)
                {
                    admin = new Register
                    {
                        UserName = "admin@gmail.com",
                        Email = "admin@gmail.com",
                        Password = "admin123",
                        Type = "SA", // SA for Super Admin
                        Age = "30",
                        Country = "AdminCountry",
                        City = "AdminCity"
                    };
                    dbcontext.Register.Add(admin);
                    dbcontext.SaveChanges();
                }
            }

            var userlogin = new Login()
            {
                UserName = loginUser.UserName,
                Password = loginUser.Password,
                Type=loginUser.Type,
            };
            try
            {
                // Verify by Email OR UserName, since frontend might send email in the UserName field
                // USE IgnoreQueryFilters() because user is not yet authenticated
                var data = dbcontext.Register.IgnoreQueryFilters()
                    .Where(x => (x.UserName == userlogin.UserName || x.Email == userlogin.UserName) && x.Password == userlogin.Password)
                    .FirstOrDefault();
                if (data != null)
                {
                    var token = GenerateJwtToken(data);
                    
                    // Update streak if student
                    if (data.Type == "Student")
                    {
                        await _gamificationService.UpdateStreakAsync(data.ID);
                    }

                    return Ok(new 
                    { 
                        token, 
                        user = data 
                    });
                }
                else
                {
                    return Unauthorized(new { message = "Invalid Username or Password" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, Register user)
        {
            if (id != user.ID) return BadRequest();

            dbcontext.Entry(user).State = EntityState.Modified;

            try
            {
                await dbcontext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!dbcontext.Register.Any(e => e.ID == id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        public static bool SendEmail(string Emailto, string Usnername, string Password, string Type)
        {
            try
            {
                string SMTPMailAddress = "aminlakhani254@gmail.com";
                string SMTPMailDisplayName = "Online Examination System";
                //string SMTPClientHostAddress = "smtp.surview.ae";
                string SMTPPassword = "gqcxoihinzwfzfrm";
                //string SMTPUserID = "surview@mg.surview.ae";
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
                        //smtp.Credentials = new NetworkCredential("aminlakhani254@gmail.com", "gqcxoihinzwfzfrm");
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
