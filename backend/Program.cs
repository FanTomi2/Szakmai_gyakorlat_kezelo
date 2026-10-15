
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:5173")
                              .AllowAnyHeader()
                              .AllowAnyMethod();
                    });
            });

            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<AppDbContext>();
                    context.Database.Migrate();
                    DataSeeder(context);
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "Hiba történt az adatbázis migrációja során.");
                }
            }

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();

            app.UseCors("AllowFrontend");

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }

        static void DataSeeder(backend.Data.AppDbContext context)
        {
            if (context.Szakok.Any()) return;

            var rand = new Random();

            var kar = new backend.Models.Kar { Nev = "GAMF" };
            context.Karok.Add(kar);
            context.SaveChanges();

            var szakok = new List<backend.Models.Szak>
            {
                new backend.Models.Szak { Nev = "Mérnökinformatikus" },
                new backend.Models.Szak { Nev = "Gépészmérnök" },
                new backend.Models.Szak { Nev = "Járműmérnök" },
                new backend.Models.Szak { Nev = "Logisztikai mérnök" }
            };
            context.Szakok.AddRange(szakok);
            context.SaveChanges();

            var cegNevek = new[] { "Audi Hungaria Zrt.", "Knorr-Bremse Kft.", "Bosch Group", "Telekom Nyrt.", "OTP Bank", "Richter Gedeon Nyrt.", "Morgan Stanley", "IBM", "Nokia", "EPAM" };
            var cegek = cegNevek.Select(n => new backend.Models.Ceg { Nev = n }).ToList();
            context.Cegek.AddRange(cegek);
            context.SaveChanges();

            var vezetekNevek = new[] { "Kovács", "Nagy", "Tóth", "Szabó", "Kiss", "Varga", "Molnár", "Farkas", "Horváth", "Papp", "Németh", "Balogh" };
            var keresztNevek = new[] { "Péter", "Gábor", "Bence", "Zsolt", "Anna", "Éva", "Lilla", "Laura", "Dávid", "Máté", "László", "Katalin" };
            var teljesitesModok = new[] { "Nappali", "Levelező" };
            var gyakModok = new[] { "Kredit elismerés", "Kurzus teljesítés" };
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            for (int i = 0; i < rand.Next(50, 201); i++)
            {
                string neptun = new string(Enumerable.Repeat(chars, 6).Select(s => s[rand.Next(s.Length)]).ToArray());
                string nev = $"{vezetekNevek[rand.Next(vezetekNevek.Length)]} {keresztNevek[rand.Next(keresztNevek.Length)]}";

                int cegId = cegek[rand.Next(cegek.Count)].Id;
                string kapcs = cegId != null ? $"{vezetekNevek[rand.Next(vezetekNevek.Length)]} {keresztNevek[rand.Next(keresztNevek.Length)]}" : "-";
                
                var hallgato = new backend.Models.Hallgato
                {
                    NeptunId = neptun,
                    Nev = nev,
                    Email = $"{neptun.ToLower()}@hallgato.nje.hu",
                    Kapcsolattarto = kapcs,
                    CegId = cegId
                };
                context.Hallgatok.Add(hallgato);

                var kepzes = new backend.Models.Kepzes
                {
                    NeptunId = neptun,
                    KarId = kar.Id,
                    SzakId = szakok[rand.Next(szakok.Count)].Id,
                    FelevSzama = rand.NextDouble() < 0.8 ? 7 : rand.Next(5,10),
                    KepzesiSzint = "BSc",
                    Teljesites = teljesitesModok[rand.Next(teljesitesModok.Length)],
                    SzakmaiGyakTelj = gyakModok[rand.Next(gyakModok.Length)]
                };
                context.Kepzesek.Add(kepzes);
            }
            context.SaveChanges();
        }
    }
}
