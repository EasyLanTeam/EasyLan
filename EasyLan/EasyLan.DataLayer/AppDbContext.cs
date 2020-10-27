using EasyLan.DataLayer.Entites;
using Microsoft.EntityFrameworkCore;

namespace EasyLan.DataLayer
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            Database.Migrate();
        }
    }
}
