using backend.Data;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ErtekelesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ErtekelesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> PostErtekeles([FromBody] UjErtekelesDto dto)
        {
            var kod = dto.NeptunId.ToUpper();

            // 1. Megkeressük a hallgatót a Neptun kód alapján
            var hallgato = await _context.Hallgatok.FirstOrDefaultAsync(h => h.NeptunId == kod);

            if (hallgato == null)
            {
                return NotFound(new { message = "Ezzel a Neptun kóddal nem található hallgató a rendszerben!" });
            }

            // 2. Ellenőrizzük, hogy van-e egyáltalán céghez rendelve
            if (hallgato.CegId == null)
            {
                return BadRequest(new { message = "Ehhez a hallgatóhoz nincs szakmai gyakorlati hely (cég) rendelve!" });
            }

            // 3. Ellenőrizzük, hogy ez a hallgató értékelte-e már a céget (ne lehessen spammelni)
            var marErtekelte = await _context.Ertekelesek.AnyAsync(e => e.NeptunId == kod);
            if (marErtekelte)
            {
                return BadRequest(new { message = "Ezzel a Neptun kóddal már érkezett be értékelés!" });
            }

            // 4. Létrehozzuk és elmentjük az új értékelést
            var ujErtekeles = new Ertekeles
            {
                NeptunId = kod,
                CegId = hallgato.CegId.Value,
                kerdes1 = dto.kerdes1,
                kerdes2 = dto.kerdes2,
                kerdes3 = dto.kerdes3,
                kerdes4 = dto.kerdes4
            };

            _context.Ertekelesek.Add(ujErtekeles);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Köszönjük! Az értékelést sikeresen rögzítettük." });
        }

    }
}