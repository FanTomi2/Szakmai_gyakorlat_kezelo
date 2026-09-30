namespace backend.DTO
{
    public class UjHallgatoDto
    {
        public string NeptunId { get; set; } = string.Empty;
        public string nev { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public string kapcsolattarto { get; set; } = string.Empty;
        public string CegNev { get; set; } = string.Empty;
        public int SzakId { get; set; }
        public string Teljesites { get; set; } = string.Empty;
        public int FelevSzama { get; set; } 
        public string KepzesiSzint { get; set; } = string.Empty;
        public string SzakmaiGyakTelj { get; set; } = string.Empty;
    }
}
