using EasyLan.DataLayer.Entites;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EasyLan.DataLayer
{
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<Tournament> Tournaments { get; set; } 
        public DbSet<Location> Locations { get; set; }
        public DbSet<Prize> Pryzes { get; set; }
        public DbSet<Match> Matches { get; set; }
        public DbSet<PlayerTournament> PlayerTournaments { get; set; }
        public DbSet<UserScore> UserScores { get; set; }
        public DbSet<ClubRequest> ClubRequests { get; set; }
        public DbSet<PlayerProfile> PlayersProfiles { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            //Database.EnsureDeleted();
            Database.Migrate();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<PlayerTournament>().HasKey("TournamentId", "UserId");

            base.OnModelCreating(builder);
        }

    }
}
