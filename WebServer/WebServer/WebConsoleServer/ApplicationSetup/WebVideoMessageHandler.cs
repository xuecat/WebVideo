using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace WebConsoleServer.ApplicationSetup
{
    class WebVideoMessageHandler : DelegatingHandler
    {
        private const string _header = "WebVideo-Header";
        protected override Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken cancellationToken)
        {
            if (request.RequestUri.AbsolutePath.IndexOf("api") != -1)
            {
                if (request.Headers.Contains(_header))
                {
                    var method = request.Headers.GetValues(_header)
                        .FirstOrDefault();

                    return base.SendAsync(request, cancellationToken)
                        .ContinueWith((task) =>
                        {
                            HttpResponseMessage response = task.Result;
                            response.Headers.Add(_header, "Server");
                            return response;
                        });
                }
                else
                {
                    var re = request.CreateErrorResponse(System.Net.HttpStatusCode.BadRequest,
                        "Bad Request");
                    var tsc = new TaskCompletionSource<HttpResponseMessage>();
                    tsc.SetResult(re);
                    return tsc.Task;
                }
            }

            return base.SendAsync(request, cancellationToken);
            
        }
    }
}
