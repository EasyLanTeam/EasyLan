using Microsoft.EntityFrameworkCore.Migrations;

namespace EasyLan.DataLayer.Migrations
{
    public partial class Gi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "ClubRequests",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "ClubRequests",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                table: "ClubRequests");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "ClubRequests");
        }
    }
}
