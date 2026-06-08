namespace TechRoad.API.Models;

public class UserProgress
{
    public string Username { get; set; } = "";

    public string Technology { get; set; } = "";

    public bool Basics { get; set; }

    public bool Intermediate { get; set; }

    public bool Advanced { get; set; }

    public int Projects { get; set; }

    public int Score { get; set; }
}