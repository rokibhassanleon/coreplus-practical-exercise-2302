namespace Coreplus.Sample.Api.DTOs
{
	public class AppointmentSummaryDto
	{
		public long practitioner_id { get; set; }
		public string practitionerName { get; set; } = "";
		public List<AppointmentList>? appointmentList { get; set; }
		public int maxItem { get; set; }
	}

	public class AppointmentList
	{
		public int year { get; set; }
		public int month { get; set; }
		public decimal revenue { get; set;}
		public decimal cost { get; set;}
	}
}
