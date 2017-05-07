using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace WebServer
{
    public class Startup
    {
        public void Configuration(IAppBuilder appbuilder)
        {
            var httpConfiguration = new HttpConfiguration();
            WebApiConfig.Register(httpConfiguration);
            appbuilder.UseWebApi(httpConfiguration);
        }
    }
}