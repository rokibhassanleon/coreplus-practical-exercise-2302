using Coreplus.Sample.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Coreplus.Sample.Api.Endpoints.Appointment
{
	public static class GetAppointments
	{
		public static RouteGroupBuilder MapGetRevenueAndCostByPractitioner(this RouteGroupBuilder group)
		{
			group.MapGet("/summary", async (long practitionerId, DateTime dtStart, DateTime dtEnd) => 
										await new AppointmentService().GetRevenueAndCostByPractitioner(practitionerId, dtStart, dtEnd));

			return group;
		}

		public static RouteGroupBuilder MapGetMonthlyAppointmentsByPractitioner(this RouteGroupBuilder group)
		{
			group.MapGet("/list", async (long practitionerId, DateTime dtStart, DateTime dtEnd) =>
										await new AppointmentService().GetMonthlyAppointmentsByPractitioner(practitionerId, dtStart, dtEnd));

			return group;
		}

		public static RouteGroupBuilder MapGetAppointmentDetails(this RouteGroupBuilder group)
		{
			group.MapGet("/details", async (long appointmentId) =>
										await new AppointmentService().GetAppointmentDetails(appointmentId));

			return group;
		}
	}
}
