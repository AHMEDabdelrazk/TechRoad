using Microsoft.AspNetCore.Mvc;
using TechRoad.API.Models;
using TechRoad.API.Services;

namespace TechRoad.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly JsonStorageService _storage;

    public AuthController(JsonStorageService storage)
    {
        _storage = storage;
    }

    [HttpPost("register")]
    public IActionResult Register(User user)
    {
        var users = _storage.GetUsers();

        if (users.Any(x => x.Email == user.Email))
        {
            return BadRequest("Email already exists");
        }

        users.Add(user);

        _storage.SaveUsers(users);

        return Ok(new
        {
            message = "User created"
        });
    }

    [HttpPost("login")]
    public IActionResult Login(User login)
    {
        var users = _storage.GetUsers();

        var user = users.FirstOrDefault(x =>
            x.Email == login.Email &&
            x.Password == login.Password);

        if (user == null)
        {
            return Unauthorized();
        }

        return Ok(new
        {
            username = user.Username,
            email = user.Email
        });
    }
}