namespace TechRoad.API.Models;

public class UserProgress
{
    public string Username { get; set; } = string.Empty;

    public string Technology { get; set; } = string.Empty;

    public bool Basics { get; set; }

    public bool Intermediate { get; set; }

    public bool Advanced { get; set; }

    public int Projects { get; set; }

    public int Score { get; set; }

    public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
}