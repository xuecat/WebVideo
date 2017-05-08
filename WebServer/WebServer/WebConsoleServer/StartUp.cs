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

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            //////
            System.Configuration.AppSettingsReader read = new AppSettingsReader();
            string webpath = Convert.ToString(read.GetValue("Web.root", typeof(string)));
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
                "index.html"
            };
            //////

            appBuilder.UseWebApi(config);
            appBuilder.UseFileServer(options);
        }
    }
}
