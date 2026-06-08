using Microsoft.AspNetCore.Mvc;
using TechRoad.API.Models;
using TechRoad.API.Services;

namespace TechRoad.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProgressController
    : ControllerBase
{
    private readonly JsonStorageService _storage;

    public ProgressController(
        JsonStorageService storage
    )
    {
        _storage = storage;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(
            _storage.GetProgress()
        );
    }

    [HttpPost]
    public IActionResult Save(
        UserProgress progress
    )
    {
        var list =
            _storage.GetProgress();

        var existing =
            list.FirstOrDefault(x =>
                x.Username ==
                progress.Username
                &&
                x.Technology ==
                progress.Technology);

        if (existing != null)
        {
            existing.Basics =
                progress.Basics;

            existing.Intermediate =
                progress.Intermediate;

            existing.Advanced =
                progress.Advanced;

            existing.Projects =
                progress.Projects;

            existing.Score =
                progress.Score;
        }
        else
        {
            list.Add(progress);
        }

        _storage.SaveProgress(list);

        return Ok();
    }
}