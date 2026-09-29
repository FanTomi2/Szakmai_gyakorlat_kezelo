using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ElsoVerzio : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cegek",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nev = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cegek", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Karok",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nev = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Karok", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Szakok",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nev = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Szakok", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Hallgatok",
                columns: table => new
                {
                    NeptunId = table.Column<string>(type: "text", nullable: false),
                    Nev = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Kapcsolattarto = table.Column<string>(type: "text", nullable: false),
                    CegId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hallgatok", x => x.NeptunId);
                    table.ForeignKey(
                        name: "FK_Hallgatok_Cegek_CegId",
                        column: x => x.CegId,
                        principalTable: "Cegek",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Oktatok",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nev = table.Column<string>(type: "text", nullable: false),
                    SzakId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Oktatok", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Oktatok_Szakok_SzakId",
                        column: x => x.SzakId,
                        principalTable: "Szakok",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Kepzesek",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Teljesites = table.Column<string>(type: "text", nullable: false),
                    FelevSzama = table.Column<int>(type: "integer", nullable: false),
                    KepzesiSzint = table.Column<string>(type: "text", nullable: false),
                    SzakmaiGyakTelj = table.Column<string>(type: "text", nullable: false),
                    NeptunId = table.Column<string>(type: "text", nullable: false),
                    KarId = table.Column<int>(type: "integer", nullable: false),
                    SzakId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kepzesek", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Kepzesek_Hallgatok_NeptunId",
                        column: x => x.NeptunId,
                        principalTable: "Hallgatok",
                        principalColumn: "NeptunId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Kepzesek_Karok_KarId",
                        column: x => x.KarId,
                        principalTable: "Karok",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Kepzesek_Szakok_SzakId",
                        column: x => x.SzakId,
                        principalTable: "Szakok",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Felhasznalok",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Jelszo = table.Column<string>(type: "text", nullable: false),
                    OktatoId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Felhasznalok", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Felhasznalok_Oktatok_OktatoId",
                        column: x => x.OktatoId,
                        principalTable: "Oktatok",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Felhasznalok_OktatoId",
                table: "Felhasznalok",
                column: "OktatoId");

            migrationBuilder.CreateIndex(
                name: "IX_Hallgatok_CegId",
                table: "Hallgatok",
                column: "CegId");

            migrationBuilder.CreateIndex(
                name: "IX_Kepzesek_KarId",
                table: "Kepzesek",
                column: "KarId");

            migrationBuilder.CreateIndex(
                name: "IX_Kepzesek_NeptunId",
                table: "Kepzesek",
                column: "NeptunId");

            migrationBuilder.CreateIndex(
                name: "IX_Kepzesek_SzakId",
                table: "Kepzesek",
                column: "SzakId");

            migrationBuilder.CreateIndex(
                name: "IX_Oktatok_SzakId",
                table: "Oktatok",
                column: "SzakId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Felhasznalok");

            migrationBuilder.DropTable(
                name: "Kepzesek");

            migrationBuilder.DropTable(
                name: "Oktatok");

            migrationBuilder.DropTable(
                name: "Hallgatok");

            migrationBuilder.DropTable(
                name: "Karok");

            migrationBuilder.DropTable(
                name: "Szakok");

            migrationBuilder.DropTable(
                name: "Cegek");
        }
    }
}
