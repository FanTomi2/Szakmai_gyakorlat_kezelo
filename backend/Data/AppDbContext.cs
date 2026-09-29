using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Kar> Karok { get; set; }
        public DbSet<Szak> Szakok { get; set; }
        public DbSet<Ceg> Cegek { get; set; }
        public DbSet<Hallgato> Hallgatok { get; set; }
        public DbSet<Kepzes> Kepzesek { get; set; }
        public DbSet<Oktato> Oktatok { get; set; }
        public DbSet<Felhasznalo> Felhasznalok { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
