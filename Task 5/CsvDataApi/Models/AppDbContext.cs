using Microsoft.EntityFrameworkCore;

namespace CsvDataApi.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<UserRecord> UserRecords { get; set; }
    }
}
