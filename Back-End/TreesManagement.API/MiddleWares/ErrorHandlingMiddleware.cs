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
                var response = new { message = "Unauthorized access. Please login." };
                await context.Response.WriteAsJsonAsync(response);
            }
            else if (context.Response.StatusCode == StatusCodes.Status403Forbidden)
            {
                context.Response.ContentType = "application/json";
                var response = new { message = "Forbidden access. You do not have permission to access this resource." };
                await context.Response.WriteAsJsonAsync(response);
            }
        }
    }
}
