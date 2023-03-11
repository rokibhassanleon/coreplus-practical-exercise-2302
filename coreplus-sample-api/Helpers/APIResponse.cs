namespace Coreplus.Sample.Api.Helpers
{
	public class APIResponse<T> where T : class
	{
		public int statusCode { get; set; }
		public object message { get; set; }
		public T data { get; set; }
	}
}
