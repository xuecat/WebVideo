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
        public IEnumerable<Video> GetRootVideo()
        {
            List<Video> lstVideo = new List<Video>();

            var dir = new DirectoryInfo(ErrorMessage.GetDataPath());
            if (dir.Exists)
            {
                foreach (var item in dir.GetFiles("*.mp4", SearchOption.TopDirectoryOnly))
                {
                    lstVideo.Add(new Video()
                    {
                        name = item.Name,
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
                        name = item.Name,
                        size = 0,
                        date = item.CreationTime.ToShortDateString(),
                        type = 0,
                        img = ""
                    });
                }
            }

            if (lstVideo.Count < 1)
            {
                throw new HttpResponseException(
                    Request.CreateErrorResponse(
                        HttpStatusCode.NotFound,
                        ErrorMessage.GetCodeMessage("S001")));
            }

            return lstVideo;
        }

        [Route("SelectVideo"), HttpPost]
        public IEnumerable<Video> SelectVideo(string parentpath)
        {
            List<Video> lstVideo = new List<Video>();

            return lstVideo;
        }
    }
}
