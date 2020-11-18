using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EasyLan.DataLayer.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "locations",
                columns: table => new
                {
                    LocationId = table.Column<Guid>(nullable: false),
                    City = table.Column<string>(nullable: true),
                    Street = table.Column<string>(nullable: true),
                    HouseNumber = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_locations", x => x.LocationId);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Username = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    Fullname = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tournaments",
                columns: table => new
                {
                    TournamentId = table.Column<Guid>(nullable: false),
                    TournamentType = table.Column<int>(nullable: false),
                    DateTimeOfStart = table.Column<DateTime>(nullable: false),
                    LocationId = table.Column<Guid>(nullable: true),
                    Game = table.Column<int>(nullable: false),
                    Format = table.Column<int>(nullable: false),
                    PryzeType = table.Column<string>(nullable: true),
                    PryzeCount = table.Column<int>(nullable: false),
                    NumberOfTeamsStart = table.Column<int>(nullable: false),
                    NumberOfTeamsEnd = table.Column<int>(nullable: false),
                    NumberOfWinner = table.Column<int>(nullable: false),
                    Payment = table.Column<int>(nullable: false),
                    Comment = table.Column<string>(nullable: true),
                    Initiator = table.Column<string>(nullable: true),
                    IsWithAlcohol = table.Column<bool>(nullable: false),
                    IsWithFood = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tournaments", x => x.TournamentId);
                    table.ForeignKey(
                        name: "FK_tournaments_locations_LocationId",
                        column: x => x.LocationId,
                        principalTable: "locations",
                        principalColumn: "LocationId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tournaments_LocationId",
                table: "tournaments",
                column: "LocationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tournaments");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "locations");
        }
    }
}
