using TechRoad.API.Models;
using TechRoad.API.Models.DTOs;

namespace TechRoad.API.Services;

public class ProgressService : IProgressService
{
    private readonly IJsonStorageService _storage;

    public ProgressService(IJsonStorageService storage)
    {
        _storage = storage;
    }

    public int CalculateScore(bool basics, bool intermediate, bool advanced, int projects)
    {
        int score = 0;
        if (basics) score += 20;
        if (intermediate) score += 30;
        if (advanced) score += 30;

        int projectScore = Math.Min(Math.Max(0, projects) * 5, 20);
        score += projectScore;

        return Math.Clamp(score, 0, 100);
    }

    public UserProgress SaveProgress(string username, SaveProgressDto dto)
    {
        var score = CalculateScore(dto.Basics, dto.Intermediate, dto.Advanced, dto.Projects);

        return _storage.SaveOrUpdateProgress(
            username,
            dto.Technology,
            dto.Basics,
            dto.Intermediate,
            dto.Advanced,
            dto.Projects,
            score
        );
    }

    public List<ProgressResponseDto> GetProgressForUser(string username)
    {
        var list = _storage.GetProgressForUser(username);
        return list.Select(MapToResponseDto).ToList();
    }

    public ProgressResponseDto? GetProgress(string username, string technology)
    {
        var progress = _storage.GetProgress(username, technology);
        return progress == null ? null : MapToResponseDto(progress);
    }

    public ProgressStatsDto GetStatsForUser(string username)
    {
        var userProgressList = _storage.GetProgressForUser(username);
        if (userProgressList.Count == 0)
        {
            return new ProgressStatsDto
            {
                TechnologiesTracked = 0,
                AverageScore = 0,
                CompletedRoadmaps = 0,
                TotalProjects = 0,
                TotalLevelsCompleted = 0
            };
        }

        var totalScore = userProgressList.Sum(p => p.Score);
        var averageScore = (int)Math.Round((double)totalScore / userProgressList.Count);
        var completedRoadmaps = userProgressList.Count(p => p.Score >= 100);
        var totalProjects = userProgressList.Sum(p => p.Projects);
        var levelsCompleted = userProgressList.Sum(p => 
            (p.Basics ? 1 : 0) + (p.Intermediate ? 1 : 0) + (p.Advanced ? 1 : 0));

        return new ProgressStatsDto
        {
            TechnologiesTracked = userProgressList.Count,
            AverageScore = averageScore,
            CompletedRoadmaps = completedRoadmaps,
            TotalProjects = totalProjects,
            TotalLevelsCompleted = levelsCompleted
        };
    }

    private static ProgressResponseDto MapToResponseDto(UserProgress p)
    {
        return new ProgressResponseDto
        {
            Username = p.Username,
            Technology = p.Technology,
            Basics = p.Basics,
            Intermediate = p.Intermediate,
            Advanced = p.Advanced,
            Projects = p.Projects,
            Score = p.Score,
            LastUpdated = p.LastUpdated
        };
    }
}
