using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

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
