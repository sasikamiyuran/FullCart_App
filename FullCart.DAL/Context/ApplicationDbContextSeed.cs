using FullCart.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace FullCart.Infrastructure.Data
{
    public static class ApplicationDbContextSeed
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            // Seed roles
            var adminRole = new IdentityRole { Id = "a69f4bbf-0a16-4efb-88f8-e3410f9dd3cb", Name = "Admin", NormalizedName = "ADMIN" };
            var customerRole = new IdentityRole { Id = "108c82bf-654d-461c-9d0e-032b19b18390", Name = "Customer", NormalizedName = "CUSTOMER" };

            List<IdentityRole> roles = new List<IdentityRole>() { adminRole, customerRole };

            modelBuilder.Entity<IdentityRole>().HasData(roles);

            // Seed users
            var hasher = new PasswordHasher<IdentityUser>();

            var adminUser = new IdentityUser
            {
                Id = "f753108d-a290-4492-8494-c040c89c7967",
                UserName = "admin@example.com",
                NormalizedUserName = "ADMIN@EXAMPLE.COM",
                Email = "admin@example.com",
                NormalizedEmail = "ADMIN@EXAMPLE.COM",
                EmailConfirmed = true,
                PasswordHash = hasher.HashPassword(null, "Admin@123")
            };

            var customerUser = new IdentityUser
            {
                Id = "c52c8ca3-234b-4406-82c7-0583e0122d35",
                UserName = "customer@example.com",
                NormalizedUserName = "CUSTOMER@EXAMPLE.COM",
                Email = "customer@example.com",
                NormalizedEmail = "CUSTOMER@EXAMPLE.COM",
                EmailConfirmed = true,
                PasswordHash = hasher.HashPassword(null, "Customer@123")
            };

            List<IdentityUser> users = new List<IdentityUser>() { adminUser, customerUser };

            modelBuilder.Entity<IdentityUser>().HasData(users);

            // Seed UserRoles
            modelBuilder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string>
                {
                    RoleId = "a69f4bbf-0a16-4efb-88f8-e3410f9dd3cb",
                    UserId = "f753108d-a290-4492-8494-c040c89c7967"
                },
                new IdentityUserRole<string>
                {
                    RoleId = "108c82bf-654d-461c-9d0e-032b19b18390",
                    UserId = "c52c8ca3-234b-4406-82c7-0583e0122d35"
                }
            );
        }
    }
}
