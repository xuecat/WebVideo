using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace WebServer
{
    public class WebConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                "DefaultApi",
                "api/{controller}/{action}/{id}",
                new { id = RouteParameter.Optional });
        }
    }
}