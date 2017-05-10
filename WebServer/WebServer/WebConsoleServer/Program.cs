using Microsoft.Owin.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using WebConsoleServer.ApplicationSetup;

namespace WebConsoleServer
{
    class Program
    {
        //test video: http://localhost:9000/#!/home/video/mp4/video?param2=..~2Fdata~2Ftest.mp4
        static void Main(string[] args)
        {
            string baseAddress = "http://localhost:9000/";

            using (WebApp.Start<StartUp>(url: baseAddress))
            {
                HttpClient client = HttpClientFactory.Create(new ConsoleMessageHandler());

                var response = client.GetAsync(baseAddress + "api/video/GetRootVideo/").Result;

                Console.WriteLine("Running test api/user/GetUser/ :");
                Console.WriteLine(response.Content.ReadAsStringAsync().Result);
                Console.ReadLine();
            }
        }
    }
}
