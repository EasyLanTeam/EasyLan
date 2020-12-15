using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EasyLan.DataLayer.Migrations
{
    public partial class addprevmatchesref : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "PrevFirstMatchId",
                table: "Matches",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PrevSecondMatchId",
                table: "Matches",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PrevFirstMatchId",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "PrevSecondMatchId",
                table: "Matches");
        }
    }
}
