using Coreplus.Sample.Api.Endpoints.Appointment;
using Coreplus.Sample.Api.Endpoints.Practitioner;
using Coreplus.Sample.Api.Middleware;
using Coreplus.Sample.Api.Services;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<PractitionerService>();
builder.Services.ConfigureHttpJsonOptions(options =>
{
	options.SerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingDefault;
});
var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

var practitionerEndpoints = app.MapGroup("/practitioners");
practitionerEndpoints.MapPractitionerEndpoints();

var appointmentEndpoints = app.MapGroup("/appointments");
appointmentEndpoints.MapAppointmentEndpoints();

app.Run();
