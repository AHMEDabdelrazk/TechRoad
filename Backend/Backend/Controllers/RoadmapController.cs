using Microsoft.AspNetCore.Mvc;
using TechRoad.API.Services;

namespace TechRoad.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoadmapController : ControllerBase
{
    private readonly JsonStorageService _storage;

    public RoadmapController(JsonStorageService storage)
    {
        _storage = storage;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        Console.WriteLine("Fetching roadmaps...");
        var roadmaps = _storage.GetRoadmaps();
        Console.WriteLine("===== DESERIALIZED =====");

        foreach (var roadmap in roadmaps!)
        {
            Console.WriteLine(
                $"Name={roadmap.Name} | Color={roadmap.Color}"
            );
        }
        return Ok(_storage.GetRoadmaps());
    }
}