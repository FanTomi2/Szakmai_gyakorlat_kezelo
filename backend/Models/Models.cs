using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Kar
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Nev { get; set; } = string.Empty;

        public ICollection<Kepzes> Kepzesek { get; set; } = new List<Kepzes>();
    }

    public class Szak
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Nev { get; set; } = string.Empty;

        public ICollection<Kepzes> Kepzesek { get; set; } = new List<Kepzes>();
        public ICollection<Oktato> Oktatok { get; set; } = new List<Oktato>();
    }

    public class Ceg
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Nev { get; set; } = string.Empty;
        public ICollection<Hallgato> Hallgatok { get; set; } = new List<Hallgato>();
    }

    public class Hallgato
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string NeptunId { get; set; }

        public string Nev { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public string Kapcsolattarto { get; set; } = string.Empty;

        public int? CegId { get; set; }
        [ForeignKey("CegId")]
        public Ceg? Ceg { get; set; }

        public ICollection<Kepzes> Kepzesek { get; set; } = new List<Kepzes>();
    }

    public class Kepzes
    {
        [Key]
        public int Id { get; set; }

        public string Teljesites { get; set; } = string.Empty;
        public int FelevSzama { get; set; }
        public string KepzesiSzint { get; set; } = string.Empty;
        public string SzakmaiGyakTelj { get; set; } = string.Empty;

        // Idegen kulcsok
        public string NeptunId { get; set; }
        [ForeignKey("NeptunId")]
        public Hallgato? Hallgato { get; set; }

        public int KarId { get; set; }
        [ForeignKey("KarId")]
        public Kar? Kar { get; set; }

        public int SzakId { get; set; }
        [ForeignKey("SzakId")]
        public Szak? Szak { get; set; }
    }

    public class Oktato
    {
        [Key]
        public int Id { get; set; }

        public string Nev { get; set; } = string.Empty;
        public int SzakId { get; set; }
        [ForeignKey("SzakId")]
        public Szak? Szak { get; set; }

        public ICollection<Felhasznalo> Felhasznalok { get; set; } = new List<Felhasznalo>();
    }

    public class Felhasznalo
    {
        [Key]
        public int Id { get; set; }

        public string Email { get; set; } = string.Empty;
        public string Jelszo { get; set; } = string.Empty;
        public int? OktatoId { get; set; }
        [ForeignKey("OktatoId")]
        public Oktato? Oktato { get; set; }
    }
}
