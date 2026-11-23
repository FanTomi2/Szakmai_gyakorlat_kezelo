using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddKarId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "KarId",
                table: "Szakok",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Szakok_KarId",
                table: "Szakok",
                column: "KarId");

            migrationBuilder.AddForeignKey(
                name: "FK_Szakok_Karok_KarId",
                table: "Szakok",
                column: "KarId",
                principalTable: "Karok",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Szakok_Karok_KarId",
                table: "Szakok");

            migrationBuilder.DropIndex(
                name: "IX_Szakok_KarId",
                table: "Szakok");

            migrationBuilder.DropColumn(
                name: "KarId",
                table: "Szakok");
        }
    }
}
