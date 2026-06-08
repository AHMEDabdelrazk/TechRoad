export default function ProfileCard()
{
    const user =
    JSON.parse(localStorage.getItem("user"));

    return(
        <div className="profile-card">
            <h2>{user.username}</h2>
            <p>Roadmaps Started : 5</p>
            <p>Average Progress : 42%</p>
        </div>
    );
}