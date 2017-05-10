using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebServer.Controllers
{
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        UserController()
        {
            ErrorMessage.Init();
        }


        [Route("GetUser"), HttpGet]
        public string GetUser()
        {
            return "test ok!";
        }
    }
}
