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
builder.Services.AddCors();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(opt =>
{
	opt.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
});

var practitionerEndpoints = app.MapGroup("/practitioners");
practitionerEndpoints.MapPractitionerEndpoints();

var appointmentEndpoints = app.MapGroup("/appointments");
appointmentEndpoints.MapAppointmentEndpoints();

app.Run();
