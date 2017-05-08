using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Web.Http;
using System.Web.Http.Dispatcher;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Microsoft.Owin;

namespace WebConsoleServer
{
    public class StartUp
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            // Configure Web API for self-host. 
            HttpConfiguration config = new HttpConfiguration();

            var assembly = System.Reflection.Assembly.GetExecutingAssembly().Location;
            string path = assembly.Substring(0, assembly.LastIndexOf("\\"))
                + "\\WebServer.dll";

            config.Services.Replace(typeof(IAssembliesResolver),
                new SelfHostAssemblyResolver(path));

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            //////https://docs.microsoft.com/en-us/aspnet/core/fundamentals/static-files
            appBuilder.UseStaticFiles();

            appBuilder.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), @"MyStaticFiles")),
                RequestPath = new PathString("/StaticFiles")
            });

            //////
            System.Configuration.AppSettingsReader read = new AppSettingsReader();
            string webpath = Convert.ToString(read.GetValue("Web.root", typeof(string)));
            string webindex = Convert.ToString(read.GetValue("Web.Index", typeof(string)));
            var physicalFileSystem = new PhysicalFileSystem(webpath);
            var options = new FileServerOptions
            {
                EnableDefaultFiles = true,
                FileSystem = physicalFileSystem
            };
            options.StaticFileOptions.FileSystem = physicalFileSystem;
            options.StaticFileOptions.ServeUnknownFileTypes = true;
            options.DefaultFilesOptions.DefaultFileNames = new[]
            {
                webindex
            };
            //////

            appBuilder.UseWebApi(config);
            appBuilder.UseFileServer(options);
        }
    }
}
