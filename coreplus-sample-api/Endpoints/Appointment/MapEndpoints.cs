using Coreplus.Sample.Api.Endpoints.Appointment;

namespace Coreplus.Sample.Api.Endpoints.Appointment
{
	public static class MapEndpoints
	{
		public static RouteGroupBuilder MapAppointmentEndpoints(this RouteGroupBuilder group)
		{
			group.MapGetRevenueAndCostByPractitioner();
			group.MapGetMonthlyAppointmentsByPractitioner();
			group.MapGetAppointmentDetails();
			return group;
		}
	}
}
