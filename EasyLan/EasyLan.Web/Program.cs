using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NLog.Extensions.Logging;
using NLog.Web;

namespace EasyLan.Web
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            // Config for NLog.
            var config = new ConfigurationBuilder()
                .SetBasePath(System.IO.Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .Build();
            NLog.LogManager.Configuration = new NLogLoggingConfiguration(config.GetSection("NLog"));

            var logger = NLog.LogManager.GetCurrentClassLogger();
            try
            {
                logger.Debug("init main");
                var host = CreateHostBuilder(args).Build();
                
                //using (var scope = host.Services.CreateScope())
                //{
                //    var services = scope.ServiceProvider;
                //    try
                //    {
                //        var userManager = services.GetRequiredService<UserManager<IdentityUser>>();
                //        var rolesManager = services.GetRequiredService<RoleManager<IdentityRole>>();
                //        await UserRoleInitializer.InitializeAsync(userManager, rolesManager);
                //    }
                //    catch (Exception ex)
                //    {
                //        logger.Error(ex, "An error occurred while seeding the database.");
                //    }
                //}
                
                host.Run();
            }
            catch (Exception exception)
            {
                //NLog: catch setup errors
                logger.Error(exception, "Stopped program because of exception");
                throw;
            }
            finally
            {
                // Ensure to flush and stop internal timers/threads before application-exit (Avoid segmentation fault on Linux)
                NLog.LogManager.Shutdown();
            }
            
            // Initialize root user and user roles
            
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                })
            .ConfigureLogging(logging =>
            {
                logging.ClearProviders();
                logging.SetMinimumLevel(LogLevel.Trace);
            })
                    .UseNLog();  // NLog: Setup NLog for Dependency injection
    }
}
