using System;
using System.Collections.Generic;
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
        [Route("GetAllVideo"), HttpGet]
        public IEnumerable<Video> GetAllVideo()
        {
            List<Video> lstVideo = new List<Video>();

            if (lstVideo.Count < 1)
            {
                throw new HttpResponseException(
                    Request.CreateErrorResponse(
                        HttpStatusCode.NotFound, 
                        ErrorMessage.GetCodeMessage("S001")));
            }

            return null;
        }
    }
}
