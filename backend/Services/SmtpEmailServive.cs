using System.Net;
using System.Net.Mail;

namespace backend.Services
{
    // Ez a VALÓDI e-mail küldő szolgáltatás.
    // Jelenleg inaktív, a Program.cs-ben a szimulált (Mock) verzió van bekötve.
    public class SmtpEmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public SmtpEmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            var smtpSettings = _config.GetSection("SmtpSettings");

            var mailMessage = new MailMessage
            {
                From = new MailAddress(smtpSettings["SenderEmail"]!, smtpSettings["SenderName"]),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };
            mailMessage.To.Add(toEmail);

            using var smtpClient = new SmtpClient(smtpSettings["Server"], int.Parse(smtpSettings["Port"]!))
            {
                Credentials = new NetworkCredential(smtpSettings["Username"], smtpSettings["Password"]),
                EnableSsl = bool.Parse(smtpSettings["EnableSsl"]!)
            };

            await smtpClient.SendMailAsync(mailMessage);
        }
    }
}