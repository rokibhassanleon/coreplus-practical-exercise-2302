using Coreplus.Sample.Api.Helpers;
using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Coreplus.Sample.Api.Middleware
{
	public class ExceptionMiddleware
	{
		private readonly RequestDelegate _next;
		private readonly IHostEnvironment _env;

		public ExceptionMiddleware(RequestDelegate next, IHostEnvironment env)
		{
			_next = next;
			_env = env;
		}

		public async Task InvokeAsync(HttpContext context)
		{
			try
			{
				await _next(context);
			}
			catch (Exception ex)
			{
				context.Response.ContentType = "application/json";
				context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

				var response = _env.IsDevelopment()
								? new APIResponse<object>() { statusCode = (int)HttpStatusCode.InternalServerError, message = ex.Message }
								: new APIResponse<object>() { statusCode = (int)HttpStatusCode.InternalServerError, message = "Internal Server Error!" };

				var options = new JsonSerializerOptions();
				options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
				options.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingDefault;

				var json = JsonSerializer.Serialize(response, options);

				await context.Response.WriteAsync(json);
			}
		}
	}
}
