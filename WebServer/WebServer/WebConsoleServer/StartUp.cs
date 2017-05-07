using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Dispatcher;

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

            appBuilder.UseWebApi(config);
        }
    }
}
