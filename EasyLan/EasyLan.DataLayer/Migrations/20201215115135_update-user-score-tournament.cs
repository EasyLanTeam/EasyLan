using Microsoft.EntityFrameworkCore.Migrations;

namespace EasyLan.DataLayer.Migrations
{
    public partial class updateuserscoretournament : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TournamentState",
                table: "tournaments",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ScoreDelta",
                table: "PlayerTournaments",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ScoreInMoment",
                table: "PlayerTournaments",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TournamentState",
                table: "tournaments");

            migrationBuilder.DropColumn(
                name: "ScoreDelta",
                table: "PlayerTournaments");

            migrationBuilder.DropColumn(
                name: "ScoreInMoment",
                table: "PlayerTournaments");
        }
    }
}
