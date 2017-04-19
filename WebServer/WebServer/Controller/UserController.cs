using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using WebServer.Model;

namespace WebServer.Controller
{
    public class UserController : ApiController
    {
        public List<Users> GetUser()
        {
            var userList = new List<Users> {
            new Users{ Id=1,UName="hehe",UAge=12},
            new Users{Id=2,UName="tete",UAge=23},
            new Users{Id=3,UName="ll",UAge=34}
            };

            
            return userList;
        }
    }
}