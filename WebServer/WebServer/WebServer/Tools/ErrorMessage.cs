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
        private static AppSettingsReader _read = null;
        private static string _rootDataPath = string.Empty;

        public static bool Init()
        {
            if (_mObj != null && _read != null)
                return true;

            try
            {
                _read = new AppSettingsReader();
                string webpath = Convert.ToString(_read.GetValue("Web.Translate", typeof(string)));

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

                return true;
            }
            catch (IOException e)
            {
                throw e;
            }
            
        }

        public static string GetWebRootPath()
        {
            if (_read == null)
            { Init(); }

            string staticpath = Convert.ToString(_read.GetValue("Static.Folder", typeof(string)));
            return "/" + staticpath.Substring(staticpath.LastIndexOf("//") + 2);
        }

        public static string GetDataPath(string extra = "")
        {
            if (_read == null)
            { Init(); }

            if (_rootDataPath == string.Empty)
            {
                var assembly = System.Reflection.Assembly.GetExecutingAssembly().Location;
                _rootDataPath = Path.Combine(assembly.Substring(0, assembly.LastIndexOf("\\")),
                    Convert.ToString(_read.GetValue("Static.Folder", typeof(string))));
            }

            if (extra == "")
            {
                return _rootDataPath;
            }

            return _rootDataPath + extra;
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