using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddErtekelesTabla : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ertekelesek",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NeptunId = table.Column<string>(type: "text", nullable: false),
                    HallgatoNeptunId = table.Column<string>(type: "text", nullable: true),
                    CegId = table.Column<int>(type: "integer", nullable: false),
                    kerdes1 = table.Column<int>(type: "integer", nullable: false),
                    kerdes2 = table.Column<int>(type: "integer", nullable: false),
                    kerdes3 = table.Column<int>(type: "integer", nullable: false),
                    kerdes4 = table.Column<int>(type: "integer", nullable: false),
                    KitoltesIdeje = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ertekelesek", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ertekelesek_Cegek_CegId",
                        column: x => x.CegId,
                        principalTable: "Cegek",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ertekelesek_Hallgatok_HallgatoNeptunId",
                        column: x => x.HallgatoNeptunId,
                        principalTable: "Hallgatok",
                        principalColumn: "NeptunId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ertekelesek_CegId",
                table: "Ertekelesek",
                column: "CegId");

            migrationBuilder.CreateIndex(
                name: "IX_Ertekelesek_HallgatoNeptunId",
                table: "Ertekelesek",
                column: "HallgatoNeptunId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ertekelesek");
        }
    }
}
