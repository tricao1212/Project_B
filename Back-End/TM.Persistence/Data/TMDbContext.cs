using Microsoft.EntityFrameworkCore;
using TM.Domain.Common;
using TM.Domain.Entity;

namespace TM.Persistence.Data
{
    public class TMDbContext : DbContext
    {
        public TMDbContext(DbContextOptions<TMDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Tree> Trees { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<User> Users { get; set; }

        public override int SaveChanges()
        {
            UpdateAuditFields();
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            UpdateAuditFields();
            return await base.SaveChangesAsync(cancellationToken);
        }

        private void UpdateAuditFields()
        {
            var entries = ChangeTracker
                .Entries()
                .Where(e => e.Entity is BaseEntity &&
                            (e.State == EntityState.Added || e.State == EntityState.Modified));

            foreach (var entry in entries)
            {
                var auditableEntity = (BaseEntity)entry.Entity;
                var currentTime = DateTime.UtcNow;
                var currentUser = "System"; 
                if (entry.State == EntityState.Added)
                {
                    auditableEntity.CreatedAt = currentTime;
                    auditableEntity.CreatedBy = currentUser;
                }

                auditableEntity.UpdatedAt = currentTime;
                auditableEntity.UpdatedBy = currentUser;
            }
        }
    }
}
