using Coreplus.Sample.Api.Helpers;
using Coreplus.Sample.Api.Types;
using Coreplus.Sample.Api.Utils;
using System;
using System.Text.Json;

namespace Coreplus.Sample.Api.Services
{
	public class AppointmentService
	{
		public record AppointmentSummaryDto(long? id, long practitioner_id, int year, int month, decimal revenue, decimal cost);
		public record AppointmentDetailsDto(long id, DateTimeOffset date, string client_name, string appointment_type, int duration);
		public async Task<APIResponse<IEnumerable<AppointmentSummaryDto>>> GetRevenueAndCostByPractitioner(long practitionerId, DateTime dtStart, DateTime dtEnd)
		{
			using var fileStream = File.OpenRead(@"./Data/appointments.json");

			JsonSerializerOptions options = new JsonSerializerOptions();
			options.Converters.Add(new JsonDateTimeConverter());

			var data = await JsonSerializer.DeserializeAsync<Appointments[]>(fileStream, options);
			if (data == null)
			{
				throw new Exception("Data read error");
			}

			var result = data.Where(x => x.practitioner_id == practitionerId && x.date >= dtStart && x.date <= dtEnd)
									.OrderBy(o => o.date.Year).ThenBy(t => t.date.Month)
									.GroupBy(x => new { x.date.Year, x.date.Month })
									.Select(s => new AppointmentSummaryDto(null, practitionerId, s.Key.Year, s.Key.Month, s.Sum(r => r.revenue), s.Sum(c => c.cost)));

			if(!result.Any())
			{
				return new APIResponse<IEnumerable<AppointmentSummaryDto>>() { statusCode = 404, message = "No record found!" };
			}
			
			return new APIResponse<IEnumerable<AppointmentSummaryDto>>() { statusCode = 200, data = result };
		}
		public async Task<APIResponse<IEnumerable<AppointmentSummaryDto>>> GetMonthlyAppointmentsByPractitioner(long practitionerId, int year, int month)
		{
			using var fileStream = File.OpenRead(@"./Data/appointments.json");

			JsonSerializerOptions options = new JsonSerializerOptions();
			options.Converters.Add(new JsonDateTimeConverter());

			var data = await JsonSerializer.DeserializeAsync<Appointments[]>(fileStream, options);
			if (data == null)
			{
				throw new Exception("Data read error");
			}

			var result = data.Where(x => x.practitioner_id == practitionerId && x.date.Year == year && x.date.Month == month)
									.OrderByDescending(o => o.date)
									.Select(s => new AppointmentSummaryDto(s.id, s.practitioner_id, s.date.Year, s.date.Month, s.revenue, s.cost));

			if(!result.Any())
			{
				return new APIResponse<IEnumerable<AppointmentSummaryDto>>() { statusCode = 404, message = "No record found!" };
			}

			return new APIResponse<IEnumerable<AppointmentSummaryDto>>() { statusCode = 200, data = result };
		}		
		public async Task<APIResponse<AppointmentDetailsDto>> GetAppointmentDetails(long appointmentId)
		{
			using var fileStream = File.OpenRead(@"./Data/appointments.json");

			JsonSerializerOptions options = new JsonSerializerOptions();
			options.Converters.Add(new JsonDateTimeConverter());

			var data = await JsonSerializer.DeserializeAsync<Appointments[]>(fileStream, options);
			if (data == null)
			{
				throw new Exception("Data read error");
			}

			var result = data.Where(x => x.id == appointmentId)
									.OrderByDescending(o => o.date)
									.Select(s => new AppointmentDetailsDto(s.id, s.date, s.client_name, s.appointment_type, s.duration))
									.FirstOrDefault();

			if(result == null)
			{
				return new APIResponse<AppointmentDetailsDto>() { statusCode = 404, message = "Record not found!" };
			}

			return new APIResponse<AppointmentDetailsDto>() { statusCode = 200, data = result };
		}
	}
}
