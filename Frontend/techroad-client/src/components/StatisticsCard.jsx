export default function StatisticsCard({
    score
}) {

    return (

        <div className="statistics-card">

            <h2>
                Statistics
            </h2>

            <p>
                Current Score: {score}%
            </p>

            <p>
                Projects Built: 4
            </p>

            <p>
                Completed Levels: 7
            </p>

            <p>
                Roadmap Completion: {score}%
            </p>

        </div>
    );
}