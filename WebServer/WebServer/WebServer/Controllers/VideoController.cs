using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebServer.Models;

namespace WebServer.Controllers
{
    [RoutePrefix("api/video")]
    public class VideoController : ApiController
    {
        [Route("GetWebRoot"), HttpGet]
        public string GetWebRoot()
        {
            return ErrorMessage.GetWebRootPath();
        }

        [Route("GetRootVideo"), HttpGet]
        public IEnumerable<Video> GetRootVideo([FromUri]string pname)
        {
            List<Video> lstVideo = new List<Video>();

            if (pname == null || pname == "0" || pname == ErrorMessage.GetWebRootPath())
            {
                pname = string.Empty;
            }

            var dir = new DirectoryInfo(ErrorMessage.GetDataPath(pname));
            if (dir.Exists)
            {
                foreach (var item in dir.GetFiles("*.mp4", SearchOption.TopDirectoryOnly))
                {
                    lstVideo.Add(new Video()
                    {
                        name = pname + "//" + item.Name,
                        size = item.Length,
                        date = item.CreationTime.ToShortDateString(),
                        type = 1,
                        img = ""
                    });
                }

                foreach (var item in dir.GetDirectories())
                {
                    lstVideo.Add(new Video()
                    {
                        name = pname + "//" + item.Name,
                        size = 0,
                        date = item.CreationTime.ToShortDateString(),
                        type = 0,
                        img = ""
                    });
                }
            }
            else
            {
                throw new HttpResponseException(
                    Request.CreateErrorResponse(
                        HttpStatusCode.NotFound,
                        ErrorMessage.GetCodeMessage("S001")));
            }

            return lstVideo;
        }

        
    }
}
