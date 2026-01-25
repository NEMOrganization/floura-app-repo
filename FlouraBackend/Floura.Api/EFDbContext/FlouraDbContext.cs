using Floura.Core.Models;
using Microsoft.EntityFrameworkCore;

public class FlouraDbContext : DbContext
{
    public FlouraDbContext(DbContextOptions<FlouraDbContext> options)
        : base(options)
    {
    }

    public DbSet<Story> Stories { get; set; }
    public DbSet<StoryBits> StoryBits { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Child> children { get; set; }
    public DbSet<Notification> Notifications { get; set; }

}