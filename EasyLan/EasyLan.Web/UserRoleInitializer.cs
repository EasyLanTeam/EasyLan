using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace EasyLan.Web
{
    public class UserRoleInitializer
    {
        public static async Task InitializeAsync(UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            string adminUsername = "easylan";
            string password = "password123";
            if (await roleManager.FindByNameAsync("admin") == null)
            {
                await roleManager.CreateAsync(new IdentityRole("admin"));
            }

            if (await roleManager.FindByNameAsync("initiator") == null)
            {
                await roleManager.CreateAsync(new IdentityRole("initiator"));
            }

            if (await roleManager.FindByNameAsync("user") == null)
            {
                await roleManager.CreateAsync(new IdentityRole("user"));
            }

            if (await userManager.FindByNameAsync(adminUsername) == null)
            {
                var admin = new IdentityUser {Email = adminUsername, UserName = adminUsername};
                IdentityResult result = await userManager.CreateAsync(admin, password);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, "admin");
                }
            }
        }
    }
}