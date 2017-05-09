using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace WebConsoleServer.ApplicationSetup
{
    class ConsoleMessageHandler : DelegatingHandler
    {
        private int _count = 0;
        protected override Task<HttpResponseMessage>
            SendAsync(HttpRequestMessage request, System.Threading.CancellationToken cancellationToken)
        {
            _count++;
            request.Headers.Add("WebVideo-Header", _count.ToString());
            return base.SendAsync(request, cancellationToken);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
        //HttpClient client = HttpClientFactory.Create(
        //new MessageHandler()
        //        );
    }
}
