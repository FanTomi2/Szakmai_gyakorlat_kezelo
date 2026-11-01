using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Ertekeles
    {
        public int Id { get; set; }

        [Required]
        public string NeptunId { get; set; } = string.Empty;

        [JsonIgnore]
        public Hallgato? Hallgato { get; set; }

        public int CegId { get; set; }

        [JsonIgnore]
        public Ceg? Ceg { get; set; }

        // A 4 kérdés
        public int kerdes1 { get; set; }
        public int kerdes2 { get; set; }
        public int kerdes3 { get; set; }
        public int kerdes4 { get; set; }

        public DateTime KitoltesIdeje { get; set; } = DateTime.UtcNow;
    }
}