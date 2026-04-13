using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PetFinder.Entities;
using PetFinder.Entities.Ad;
using PetFinder.Entities.User;

namespace PetFinder
{
    public class DbAppContext : IdentityDbContext<UserEntity, RoleEntity, int>
    {
        public DbAppContext(DbContextOptions<DbAppContext> options)
        : base(options) { }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<AnimalTypeEntity> AnimalTypes { get; set; }
        public DbSet<AdEntity> Ads { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<UserRoleEntity>(ur =>
            {
                ur.HasKey(ur => new { ur.UserId, ur.RoleId });

                ur.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(r => r.RoleId)
                    .IsRequired();

                ur.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(u => u.UserId)
                    .IsRequired();
            });
            builder.Entity<RefreshToken>()
                    .HasOne(rt => rt.User)
                    .WithMany()
                    .HasForeignKey(rt => rt.UserId);

        }
    }
}
