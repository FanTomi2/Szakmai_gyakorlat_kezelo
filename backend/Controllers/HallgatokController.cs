using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.DTO;

namespace SzakdogaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HallgatokController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HallgatokController(AppDbContext context)
        {
            _context = context;
        }

        // csak hallgatok
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hallgato>>> GetHallgatok()
        {
            var hallgatok = await _context.Hallgatok.ToListAsync();
            return Ok(hallgatok);
        }

        // Hallgatok összekötött táblákkal
        [HttpGet("reszletes")]
        public async Task<IActionResult> GetHallgatokReszletesen()
        {
            var hallgatok = await _context.Hallgatok
                // Táblák összekapcsolása
                .Include(h => h.Ceg)
                .Include(h => h.Kepzesek)
                    .ThenInclude(k => k.Kar)
                .Include(h => h.Kepzesek)
                    .ThenInclude(k => k.Szak)
                // JSON struktúra
                .Select(h => new
                {
                    NeptunId = h.NeptunId,
                    Nev = h.Nev,
                    Email = h.Email,
                    Kapcsolattarto = h.Kapcsolattarto,
                    CegNev = h.Ceg.Nev,

                    // A hallgatóhoz tartozó képzések listája
                    Kepzesek = h.Kepzesek.Select(k => new
                    {
                        KarNev = k.Kar.Nev,
                        SzakNev = k.Szak.Nev,
                        Teljesites = k.Teljesites,
                        FelevSzama = k.FelevSzama,
                        KepzesiSzint = k.KepzesiSzint,
                        SzakmaiGyakTelj = k.SzakmaiGyakTelj
                    })
                })
                .ToListAsync();
            return Ok(hallgatok);
        }

        // Statisztika
        [HttpGet("statisztika/dashboard")]
        public async Task<IActionResult> GetDashboardStats()
        {
            var hallgatok = await _context.Hallgatok
                .Include(h => h.Kepzesek)
                    .ThenInclude(k => k.Szak)
                .ToListAsync();

            // Szakok eloszlásának kiszámolása
            var szakok = hallgatok
                .Where(h => h.Kepzesek.Any() && h.Kepzesek.First().Szak != null)
                .GroupBy(h => h.Kepzesek.First().Szak.Nev)
                .ToDictionary(g => g.Key, g => g.Count());

            // Félévek eloszlása
            var felevek = hallgatok
                .Where(h => h.Kepzesek.Any())
                .GroupBy(h => h.Kepzesek.First().FelevSzama + ". félév")
                .ToDictionary(g => g.Key, g => g.Count());

            // Munkarend (nappali/levelező)
            var munkarend = hallgatok
                .Where(h => h.Kepzesek.Any())
                .GroupBy(h => {
                    var t = h.Kepzesek.First().Teljesites;
                    return string.IsNullOrEmpty(t) ? "Ismeretlen" : char.ToUpper(t[0]) + t.Substring(1);
                })
                .ToDictionary(g => g.Key, g => g.Count());

            // Gyakorlat módja
            var gyakMod = hallgatok
                .Where(h => h.Kepzesek.Any())
                .GroupBy(h => {
                    var m = h.Kepzesek.First().SzakmaiGyakTelj;
                    return string.IsNullOrEmpty(m) ? "Ismeretlen" : char.ToUpper(m[0]) + m.Substring(1);
                })
                .ToDictionary(g => g.Key, g => g.Count());

            var stat = new
            {
                OsszesHallgato = hallgatok.Count,
                AktivCegek = hallgatok.Where(h => h.CegId != null).Select(h => h.CegId).Distinct().Count(),
                LegnepszerubbSzak = szakok.OrderByDescending(s => s.Value).FirstOrDefault().Key ?? "-",
                SzakokEloszlasa = szakok,
                FelevekEloszlasa = felevek.OrderBy(x => x.Key).ToDictionary(x => x.Key, x => x.Value),
                MunkarendEloszlasa = munkarend,
                GyakorlatModEloszlasa = gyakMod
            };

            return Ok(stat);
        }

        //uj hallgato
        [HttpPost]
        public async Task<IActionResult> PostHallgato([FromBody] UjHallgatoDto dto)
        {
            if (await _context.Hallgatok.AnyAsync(h => h.NeptunId == dto.NeptunId.ToUpper()))
            {
                return BadRequest("Már létezik ilyen neptun kód");
            }

            var letezikCeg = await _context.Cegek
                .FirstOrDefaultAsync(c => c.Nev.ToLower() == dto.CegNev.ToLower());

            int veglegesCegId;
            if (letezikCeg != null)
            {
                veglegesCegId = letezikCeg.Id;
            } else
            {
                var ujCeg = new Ceg { Nev = dto.CegNev };
                _context.Cegek.Add(ujCeg);
                await _context.SaveChangesAsync();
                veglegesCegId = ujCeg.Id;
            }

            var ujHallgato = new Hallgato
            {
                NeptunId = dto.NeptunId.ToUpper(),
                Nev = dto.nev,
                Email = dto.email,
                Kapcsolattarto = dto.kapcsolattarto,
                CegId = veglegesCegId
            };

            var ujKepzes = new Kepzes
            {
                NeptunId = dto.NeptunId.ToUpper(),
                KarId = 1,
                SzakId = dto.SzakId,
                Teljesites = dto.Teljesites,
                FelevSzama = dto.FelevSzama,
                KepzesiSzint = dto.KepzesiSzint,
                SzakmaiGyakTelj = dto.SzakmaiGyakTelj
            };

            _context.Hallgatok.Add(ujHallgato);
            _context.Kepzesek.Add(ujKepzes);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Hallgató sikeresen rögzítve!" });
        }

        //hallgato törlés
        [HttpDelete("{neptunId}")]
        public async Task<IActionResult> DeleteHallgato(string neptunId)
        {
            var kod = neptunId.ToUpper();
            var hallgato = await _context.Hallgatok.FirstOrDefaultAsync(h => h.NeptunId == kod);

            if (hallgato == null)
            {
                return NotFound(new { message = "A hallgató nem található!" });
            }

            var kepzesek = _context.Kepzesek.Where(k => k.NeptunId == kod);
            _context.Kepzesek.RemoveRange(kepzesek);

            _context.Hallgatok.Remove(hallgato);

            await _context.SaveChangesAsync();
            return Ok(new { message = "Hallgató sikeresen törölve!" });
        }

        //hallgato modositas
        [HttpPut("{neptunId}")]
        public async Task<IActionResult> PutHallgato(string neptunId, [FromBody] UjHallgatoDto dto)
        {
            var kod = neptunId.ToUpper();

            var hallgato = await _context.Hallgatok
                .Include(h => h.Kepzesek)
                .FirstOrDefaultAsync(h => h.NeptunId == kod);

            if (hallgato == null) return NotFound(new { message = "A hallgató nem található!" });

            var letezikCeg = await _context.Cegek.FirstOrDefaultAsync(c => c.Nev.ToLower() == dto.CegNev.ToLower());
            int veglegesCegId;

            if (letezikCeg != null) veglegesCegId = letezikCeg.Id;
            else
            {
                var ujCeg = new Ceg { Nev = dto.CegNev };
                _context.Cegek.Add(ujCeg);
                await _context.SaveChangesAsync();
                veglegesCegId = ujCeg.Id;
            }

            hallgato.Nev = dto.nev;
            hallgato.Email = dto.email;
            hallgato.Kapcsolattarto = dto.kapcsolattarto;
            hallgato.CegId = veglegesCegId;

            var kepzes = hallgato.Kepzesek.FirstOrDefault();
            if (kepzes != null)
            {
                kepzes.SzakId = dto.SzakId;
                kepzes.Teljesites = dto.Teljesites;
                kepzes.FelevSzama = dto.FelevSzama;
                kepzes.KepzesiSzint = dto.KepzesiSzint;
                kepzes.SzakmaiGyakTelj = dto.SzakmaiGyakTelj;
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Sikeres módosítás!" });
        }
    }
}