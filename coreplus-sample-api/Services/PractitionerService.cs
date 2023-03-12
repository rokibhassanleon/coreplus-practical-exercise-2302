using System.Text.Json;
using Coreplus.Sample.Api.Helpers;
using Coreplus.Sample.Api.Types;

namespace Coreplus.Sample.Api.Services;

public record PractitionerDto(long id, string name);

public class PractitionerService
{
    public async Task<APIResponse<IEnumerable<PractitionerDto>>> GetPractitioners()
    {
        using var fileStream = File.OpenRead(@"./Data/practitioners.json");
        var data = await JsonSerializer.DeserializeAsync<Practitioner[]>(fileStream);
        if (data == null)
        {
            throw new Exception("Data read error");
        }

        var result = data.Select(prac => new PractitionerDto(prac.id, prac.name));

        if(!result.Any())
        {
            return new APIResponse<IEnumerable<PractitionerDto>>() { statusCode = 404, message = "No record found!"};
		}

        return new APIResponse<IEnumerable<PractitionerDto>>() { statusCode = 200, data = result };
	}

    public async Task<APIResponse<IEnumerable<PractitionerDto>>> GetSupervisorPractitioners()
    {
        using var fileStream = File.OpenRead(@"./Data/practitioners.json");
        var data = await JsonSerializer.DeserializeAsync<Practitioner[]>(fileStream);
        if (data == null)
        {
            throw new Exception("Data read error");
        }

        var result = data.Where(practitioner => (int)practitioner.level >= 2).Select(prac => new PractitionerDto(prac.id, prac.name));

		if (!result.Any())
		{
			return new APIResponse<IEnumerable<PractitionerDto>>() { statusCode = 404, message = "No record found!" };
		}

        return new APIResponse<IEnumerable<PractitionerDto>> { statusCode = 200, data = result };
	}

	public async Task<APIResponse<IEnumerable<PractitionerDto>>> GetRemainingPractitioners()
	{
		using var fileStream = File.OpenRead(@"./Data/practitioners.json");
		var data = await JsonSerializer.DeserializeAsync<Practitioner[]>(fileStream);
		if (data == null)
		{
			throw new Exception("Data read error");
		}

		var result = data.Where(practitioner => (int)practitioner.level < 2).Select(prac => new PractitionerDto(prac.id, prac.name));

		if (!result.Any())
		{
			return new APIResponse<IEnumerable<PractitionerDto>>() { statusCode = 404, message = "No record found!" };
		}

		return new APIResponse<IEnumerable<PractitionerDto>> { statusCode = 200, data = result };
	}
}