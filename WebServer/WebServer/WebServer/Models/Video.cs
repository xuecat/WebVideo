using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebServer.Models
{
    public class Video
    {
        public string name { get; set; }
        public long size { get; set; }
        public string date { get; set; }
        public int type { get; set; }
        public string img { get; set; }
    }
}