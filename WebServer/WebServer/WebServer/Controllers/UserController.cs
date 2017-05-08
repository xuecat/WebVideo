using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace WebServer.Controllers
{
    public class UserController : ApiController
    {
        //[Route(""), HttpGet]
        //[ApiExplorerSettings(IgnoreApi = true)]
        //public HttpResponseMessage RedirectToSwaggerUi()
        //{
        //    var httpResponseMessage = new HttpResponseMessage(HttpStatusCode.Found);
        //    httpResponseMessage.Headers.Location = new Uri("/app", UriKind.Relative);
        //    return httpResponseMessage;
        //}

        [Route("api/user/GetUser"), HttpGet]
        public string GetUser()
        {
            return "test";
        }
    }
}
