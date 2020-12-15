using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EasyLan.DataLayer.Migrations
{
    public partial class AddClubRequestd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ClubRequests",
                columns: table => new
                {
                    ClubRequestId = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    Status = table.Column<int>(nullable: false),
                    IsCompleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClubRequests", x => x.ClubRequestId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClubRequests");
        }
    }
}
