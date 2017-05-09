using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Web.Http;
using Microsoft.Owin;
using System.Web.Http.Dispatcher;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using System.IO;
using System.Diagnostics;

namespace WebConsoleServer
{
    public class StartUp
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            // Configure Web API for self-host. 
            HttpConfiguration config = new HttpConfiguration();
            System.Configuration.AppSettingsReader read = new AppSettingsReader();

            var assembly = System.Reflection.Assembly.GetExecutingAssembly().Location;
            string path = assembly.Substring(0, assembly.LastIndexOf("\\"))
                + "\\WebServer.dll";

            config.Services.Replace(typeof(IAssembliesResolver),
                new SelfHostAssemblyResolver(path));

            /////
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            //////
            var staticFIles = new StaticFileOptions();
            string staticpath = Convert.ToString(read.GetValue("Static.Folder", typeof(string)));

            staticFIles.RequestPath = new PathString("/" + staticpath.Substring(staticpath.LastIndexOf("//")+2));
            var staticphPath = Path.Combine(assembly.Substring(0, assembly.LastIndexOf("\\")),
                staticpath);

            if (!Directory.Exists(staticphPath))
            {
                Debug.WriteLine("error file");
                return;
            }
            staticFIles.FileSystem = new PhysicalFileSystem(staticphPath);

            //////
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
            appBuilder.UseStaticFiles(staticFIles);
        }
    }
}
