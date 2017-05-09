using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Dispatcher;

namespace WebConsoleServer
{
    public class SelfHostAssemblyResolver : IAssembliesResolver
    {
        private string _path = string.Empty;

        public SelfHostAssemblyResolver(string path)
        {
            this._path = path;
        }

        public ICollection<Assembly> GetAssemblies()
        {
            List<Assembly> ass =
                new List<Assembly>();
            ass.Add(Assembly.LoadFrom(_path));
            return ass;
        }
    }
}
