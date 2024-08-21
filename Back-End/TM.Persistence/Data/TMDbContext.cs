using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TM.Domain.Common;
using TM.Domain.Entity;

namespace TM.Persistence.Data
{
    public class TMDbContext : DbContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public TMDbContext(DbContextOptions<TMDbContext> options, IHttpContextAccessor httpContextAccessor) : base(options)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Tree>()
                .HasOne(t => t.Position)
                .WithOne(p => p.Tree)
                .HasForeignKey<Position>(p => p.TreeId);

            modelBuilder.Entity<Tree>()
               .HasIndex(t => t.TreeCode)
               .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(t => t.UserName)
                .IsUnique();

            modelBuilder.Entity<TypeTree>()
                .HasIndex(tt => tt.Name)
                .IsUnique();

            modelBuilder.Entity<Tree>()
                .HasOne(t => t.TypeTree)
                .WithMany(tt => tt.ListTrees)
                .HasForeignKey(t => t.TypeTreeId);

            modelBuilder.Entity<Assignment>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.Tree)
                    .WithMany(t => t.Assignments)
                    .HasForeignKey(e => e.TreeId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(e => e.User)
                    .WithMany(u => u.Assignments)
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasMany(e => e.WorkContent)
                    .WithOne(u => u.Assignment)
                    .HasForeignKey(u => u.AssignmentId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }

        public DbSet<Tree> Trees { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<TypeTree> TypeTrees { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<WorkContent> WorkContents { get; set; }

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
                var currentTime = DateTime.Now;
                var currentUser = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.Name)?.Value ?? "System";
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
