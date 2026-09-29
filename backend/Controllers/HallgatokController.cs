using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

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

        // GET: api/Hallgatok
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hallgato>>> GetHallgatok()
        {
            var hallgatok = await _context.Hallgatok.ToListAsync();
            return Ok(hallgatok);
        }

        // GET: api/Hallgatok/reszletes
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

        // GET: api/Hallgatok/statisztika/felevek
        [HttpGet("statisztika/felevek")]
        public async Task<IActionResult> GetFelevStatisztika()
        {
            var statisztika = await _context.Kepzesek
                .GroupBy(k => k.FelevSzama)
                .Select(csoport => new
                {
                    Felev = csoport.Key,            
                    HallgatoSzam = csoport.Count()
                })
                .OrderBy(x => x.Felev)
                .ToListAsync();

            return Ok(statisztika);
        }

        [HttpGet("statisztika/teljesites")]
        public async Task<IActionResult> GetKepzesTeljesitesStatisztika() 
        {
            var statisztika = await _context.Kepzesek
                .GroupBy(k => k.Teljesites)
                .Select(csoport => new
                {
                    kepzesTelj= csoport.Key,
                    szama = csoport.Count()
                })
                .OrderBy(x => x.kepzesTelj)
                .ToListAsync();
            return Ok(statisztika);
        }

        [HttpGet("statisztika/teljmod")]
        public async Task<IActionResult> GetTeljesitesModStatisztika()
        {
            var statisztika = await _context.Kepzesek
                .GroupBy(k => k.SzakmaiGyakTelj)
                .Select(csoport => new
                {
                    Teljesitesmod = csoport.Key,
                    szama = csoport.Count()
                })
                .OrderBy(x => x.Teljesitesmod)
                .ToListAsync();
            return Ok(statisztika);
        }
    }
}