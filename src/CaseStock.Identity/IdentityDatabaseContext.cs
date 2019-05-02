using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CaseStock.Identity
{
    public abstract class IdentityDatabaseContext
        : IdentityDbContext<User, Role, string, UserClaim, UserRole, UserLogin, RoleClaim, UserToken>
    {
        protected IdentityDatabaseContext(DbContextOptions options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            ConfigureIdentity(modelBuilder);
        }

        private static void ConfigureIdentity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(b =>
            {
                b.ToTable("Users");
            });

            modelBuilder.Entity<Role>(b =>
            {
                b.ToTable("Roles");
            });

            modelBuilder.Entity<UserClaim>(b =>
            {
                b.ToTable("UserClaims");
            });

            modelBuilder.Entity<UserRole>(b =>
            {
                b.ToTable("UserRoles");
            });

            modelBuilder.Entity<UserLogin>(b =>
            {
                b.ToTable("UserLogins");
            });

            modelBuilder.Entity<RoleClaim>(b =>
            {
                b.ToTable("RoleClaims");
            });

            modelBuilder.Entity<UserToken>(b =>
            {
                b.ToTable("UserTokens");
            });
        }
    }
}
