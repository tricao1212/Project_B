using System.Net;

namespace TM.Domain.Common
{
    public class Result<T> 
    {
        public HttpStatusCode StatusCode { get; set; }
        public bool IsSuccess { get; set; }
        public string? Message { get; set; } = string.Empty;
        public T? Data { get; set; } 
    }
}
