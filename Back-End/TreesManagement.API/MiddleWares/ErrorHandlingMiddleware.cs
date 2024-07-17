using System.Net;

namespace TreesManagement.API.MiddleWares
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            await _next(context);

            if (context.Response.StatusCode == StatusCodes.Status401Unauthorized)
            {
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsJsonAsync(new
                {
                    Message = "Unauthorized access.",
                    StatusCode = StatusCodes.Status401Unauthorized
                });
            }
        }
    }
}
