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
        public DbSet<UserScore> UserScores { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }
    }
}
