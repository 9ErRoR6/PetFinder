using Microsoft.EntityFrameworkCore;
using PetFinder.Constants;
using PetFinder.Entities.User;
using System;
using Microsoft.AspNetCore.Identity;
namespace PetFinder.DbInitializers
{
    public static class SeederDB
    {
        public static void SeedData(this IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var service = scope.ServiceProvider;
                //Отримую посилання на наш контекст
                var context = service.GetRequiredService<DbAppContext>();
                context.Database.Migrate();

                var userManager = scope.ServiceProvider
                    .GetRequiredService<UserManager<UserEntity>>();

                var roleManager = scope.ServiceProvider
                    .GetRequiredService<RoleManager<RoleEntity>>();

                #region Додавання користувачів та ролей

                if (!context.Roles.Any())
                {
                    foreach (var role in Roles.All)
                    {
                        var result = roleManager.CreateAsync(new RoleEntity
                        {
                            Name = role
                        }).Result;
                    }
                }

                if (!context.Users.Any())
                {
                    var user = new UserEntity
                    {
                        FullName = "admin",
                        Email = "admin@gmail.com",
                        UserName = "admin@gmail.com"
                    };
                    var result = userManager.CreateAsync(user, "Ewq12345=").Result;
                    if (result.Succeeded)
                    {
                        result = userManager.AddToRoleAsync(user, Roles.Admin).Result;
                    }
                }

                #endregion
            }
        }
    }
}
