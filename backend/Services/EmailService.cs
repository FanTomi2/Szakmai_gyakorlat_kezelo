using System.Net;
using System.Net.Mail;

namespace backend.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public Task SendEmailAsync(string toEmail, string subject, string body)
        {
            /*
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
            */

            // Valódi levélküldés HEYLETT csak kiírjuk a konzolra a levelet.

            Console.WriteLine("\n=======================================================");
            Console.WriteLine($"[SZIMULÁLT E-MAIL KÜLDÉS - TESZT KÖRNYEZET]");
            Console.WriteLine($"CÍMZETT: {toEmail}");
            Console.WriteLine($"TÁRGY:   {subject}");
            Console.WriteLine($"--------------------- ÜZENET --------------------------");
            Console.WriteLine(body);
            Console.WriteLine("=======================================================\n");

            return Task.CompletedTask;
        }
    }
}