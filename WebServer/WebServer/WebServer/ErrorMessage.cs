using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Configuration;

namespace WebServer
{
    static public class ErrorMessage
    {
        private static JObject _mObj = null;
        public static bool Init()
        {
            try
            {
                System.Configuration.AppSettingsReader read = new AppSettingsReader();
                string webpath = Convert.ToString(read.GetValue("Web.Translate", typeof(string)));

                var assembly = System.Reflection.Assembly.GetExecutingAssembly().Location;
                string rootPath = assembly.Substring(0, assembly.LastIndexOf("\\")+1)
                    + webpath;

                using (FileStream file = new FileStream(rootPath, FileMode.Open))
                {
                    file.Seek(0, SeekOrigin.Begin);
                    byte[] pbyte = new byte[file.Length];
                    if (file.Read(pbyte, 0, pbyte.Length) > 0)
                    {
                        string bufstr = System.Text.Encoding.UTF8.GetString(pbyte);

                        _mObj = JsonConvert.DeserializeObject(bufstr) as JObject;
                    }
                }

            }
            catch (IOException e)
            {
                throw e;
            }
            return false;
        }

        public static string GetCodeMessage(int code)
        {
            if (_mObj == null)
            { Init(); }
            return _mObj[code.ToString()].ToString();
        }

        public static string GetCodeMessage(string code)
        {
            if (_mObj == null)
            { Init(); }
            return _mObj[code].ToString();
        }
    }
}