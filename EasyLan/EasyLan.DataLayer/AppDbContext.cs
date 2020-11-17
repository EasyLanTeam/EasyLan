using EasyLan.DataLayer.Entites;
using Microsoft.EntityFrameworkCore;

namespace EasyLan.DataLayer
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Tournament> Tournaments { get; set; } 
        public DbSet<Location> Locations { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
    }
}
