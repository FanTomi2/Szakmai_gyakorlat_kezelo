namespace backend.Services
{
    public class EmailService : IEmailService
    {
        public Task SendEmailAsync(string toEmail, string subject, string body)
        {
            // Valódi levélküldés HEYLETT csak kiírjuk a terminálba/konzolra a levelet.

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