using Floura.Core.Models;
using Microsoft.EntityFrameworkCore;

public class FlouraDbContext : DbContext
{
    public FlouraDbContext(DbContextOptions<FlouraDbContext> options)
        : base(options)
    {
    }

    public DbSet<Story> Stories { get; set; }
}