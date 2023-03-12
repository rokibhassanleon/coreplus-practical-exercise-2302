using Coreplus.Sample.Api.Helpers;
using Coreplus.Sample.Api.Types;
using Coreplus.Sample.Api.Utils;
using System;
using System.Text.Json;

namespace Coreplus.Sample.Api.Services
{
	public class AppointmentService
	{
		public record AppointmentDto(long? id, long practitioner_id, string practitionerName, int year, int month, decimal revenue, decimal cost);
		public record AppointmentListDto(long? id, long practitioner_id, DateTimeOffset date, decimal revenue, decimal cost);
		public record AppointmentDetailsDto(long id, DateTimeOffset date, string client_name, string appointment_type, int duration);
		public record AppointmentSummaryListDto(int year, int month, decimal revenue, decimal cost);
		public record AppointmentSummaryDto(long practitioner_id, string practitionerName, IEnumerable<AppointmentSummaryListDto> appointmentList);
		public async Task<APIResponse<IEnumerable<AppointmentSummaryDto>>> GetRevenueAndCostByPractitioner(long practitionerId, DateTime dtStart, DateTime dtEnd)
		{
			using var fileStream = File.OpenRead(@"./Data/appointments.json");
			using var practitionerStream = File.OpenRead(@"./Data/practitioners.json");

			JsonSerializerOptions options = new JsonSerializerOptions();
			options.Converters.Add(new JsonDateTimeConverter());

			//Read json data files
			var appointmentData = await JsonSerializer.DeserializeAsync<Appointments[]>(fileStream, options);
			var practitionerData = await JsonSerializer.DeserializeAsync<Practitioner[]>(practitionerStream, options);

			//If no data then throw exception
			if (appointmentData == null || practitionerData == null)
			{
				throw new Exception("Data read error");
			}

			//Join Practitioner and Appointment data (to fetch Practitioner name) and filter by date range
			var query = from appointment in appointmentData
						join practitioner in practitionerData on appointment.practitioner_id equals practitioner.id
						where appointment.date >= dtStart && appointment.date <= dtEnd
						select new AppointmentDto(null, appointment.practitioner_id, practitioner.name, appointment.date.Year,
														 appointment.date.Month, appointment.revenue, appointment.cost);

			//If practitionerId provided then filter the data
			if(practitionerId > 0)
			{
				query = query.Where(x => x.practitioner_id == practitionerId);
			}

			//Group data with Year and Month
			var result = query.OrderBy(x => x.year).ThenBy(t => t.month)
							  .GroupBy(x => new { x.year, x.month, x.practitionerName, x.practitioner_id })
							  .Select(s => new AppointmentDto(null, s.Key.practitioner_id, 
																	 s.Key.practitionerName, s.Key.year, s.Key.month, 
																	 s.Sum(r => r.revenue), s.Sum(c => c.cost))
									 );

			//If no record found then send 404 not found
			if(!result.Any())
			{
				return new APIResponse<IEnumerable<AppointmentSummaryDto>>() { statusCode = 404, message = "No record found!" };
			}

			//Get distinct practitioner name from result
			var practitioners = result.Select(x => x.practitionerName).Distinct().ToList();

			List<AppointmentSummaryDto> summaryResult = new List<AppointmentSummaryDto>();

			foreach(var item in practitioners)
			{
				//Filter result with practitionerName
				var records = result.Where(x => x.practitionerName == item).ToList();

				List<AppointmentSummaryListDto> appointmentLists= new List<AppointmentSummaryListDto>();

				//Loop through the individual practitioner records and create AppointmentList
				records.ForEach(x => appointmentLists.Add(new AppointmentSummaryListDto(x.year, x.month, x.revenue, x.cost)));

				//Create AppointmentSummaryDto
				AppointmentSummaryDto summary = new AppointmentSummaryDto(records[0].practitioner_id, records[0].practitionerName,appointmentLists);

				summaryResult.Add(summary);
			}
			
			return new APIResponse<IEnumerable<AppointmentSummaryDto>>() { statusCode = 200, data = summaryResult };
		}
		public async Task<APIResponse<IEnumerable<AppointmentListDto>>> GetMonthlyAppointmentsByPractitioner(long practitionerId, DateTime dtStart, DateTime dtEnd)
		{
			using var fileStream = File.OpenRead(@"./Data/appointments.json");

			JsonSerializerOptions options = new JsonSerializerOptions();
			options.Converters.Add(new JsonDateTimeConverter());

			//Fetch data from json data
			var data = await JsonSerializer.DeserializeAsync<Appointments[]>(fileStream, options);

			//If no data then throw exception
			if (data == null)
			{
				throw new Exception("Data read error");
			}

			//Filter data with practitionerId and date range
			var result = data.Where(x => x.practitioner_id == practitionerId && x.date >= dtStart && x.date <= dtEnd)
									.OrderBy(o => o.date)
									.Select(s => new AppointmentListDto(s.id, s.practitioner_id, s.date, s.revenue, s.cost));

			//If no record found then return 404 not found
			if(!result.Any())
			{
				return new APIResponse<IEnumerable<AppointmentListDto>>() { statusCode = 404, message = "No record found!" };
			}

			return new APIResponse<IEnumerable<AppointmentListDto>>() { statusCode = 200, data = result };
		}		
		public async Task<APIResponse<AppointmentDetailsDto>> GetAppointmentDetails(long appointmentId)
		{
			using var fileStream = File.OpenRead(@"./Data/appointments.json");

			JsonSerializerOptions options = new JsonSerializerOptions();
			options.Converters.Add(new JsonDateTimeConverter());

			//Fetch data from json data
			var data = await JsonSerializer.DeserializeAsync<Appointments[]>(fileStream, options);

			//If not data then throw exception
			if (data == null)
			{
				throw new Exception("Data read error");
			}

			//Filter data by appointmentId
			var result = data.Where(x => x.id == appointmentId)
									.OrderByDescending(o => o.date)
									.Select(s => new AppointmentDetailsDto(s.id, s.date, s.client_name, s.appointment_type, s.duration))
									.FirstOrDefault();

			//If not record found the return 404 not found
			if(result == null)
			{
				return new APIResponse<AppointmentDetailsDto>() { statusCode = 404, message = "Record not found!" };
			}

			return new APIResponse<AppointmentDetailsDto>() { statusCode = 200, data = result };
		}
	}
}
