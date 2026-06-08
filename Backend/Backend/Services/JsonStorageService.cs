using System.Text.Json;
using TechRoad.API.Models;

namespace TechRoad.API.Services;

public class JsonStorageService
{
    private readonly IWebHostEnvironment _env;
    private readonly JsonSerializerOptions _jsonOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    public JsonStorageService(IWebHostEnvironment env)
    {
        _env = env;
    }

    private string UsersFile =>
        Path.Combine(_env.ContentRootPath, "Data", "users.json");

    private string RoadmapsFile =>
        Path.Combine(_env.ContentRootPath, "Data", "roadmaps.json");

    public List<User> GetUsers()
    {
        if (!File.Exists(UsersFile))
            return new();

        var json = File.ReadAllText(UsersFile);

        return JsonSerializer.Deserialize<List<User>>(json, _jsonOptions)
               ?? new List<User>();
    }

    public void SaveUsers(List<User> users)
    {
        var json = JsonSerializer.Serialize(
            users,
            new JsonSerializerOptions
            {
                WriteIndented = true
            });

        File.WriteAllText(UsersFile, json);
    }

    public List<Category> GetRoadmaps()
    {
        if (!File.Exists(RoadmapsFile))
            return new();

        var json = File.ReadAllText(RoadmapsFile);

        var result = JsonSerializer.Deserialize<List<Category>>(json, _jsonOptions);

        Console.WriteLine("COUNT = " + result?.Count);


        return result ?? new List<Category>();
    }

    private string ProgressFile =>
    Path.Combine(
        _env.ContentRootPath,
        "Data",
        "progress.json"
    );

    public List<UserProgress> GetProgress()
    {
        if (!File.Exists(ProgressFile))
            return new();

        var json =
            File.ReadAllText(ProgressFile);

        return JsonSerializer.Deserialize<
            List<UserProgress>
        >(json)
        ?? new();
    }

    public void SaveProgress(
    List<UserProgress> progress
)
    {
        var json =
            JsonSerializer.Serialize(
                progress,
                new JsonSerializerOptions
                {
                    WriteIndented = true
                });

        File.WriteAllText(
            ProgressFile,
            json
        );
    }
}