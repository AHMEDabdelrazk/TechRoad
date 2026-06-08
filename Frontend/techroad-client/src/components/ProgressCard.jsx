import {
    useEffect,
    useState
}
from "react";
import api from "../services/api";
import StatisticsCard
from "./StatisticsCard";


export default function ProgressCard({
    technology
}) {

    const saveProgress =
    async () =>
    {
        const user =
        JSON.parse(
            localStorage.getItem("user")
        );

        await api.post(
            "/progress",
            {
                username:
                    user.username,

                technology:
                    technology.name,

                basics,
                intermediate,
                advanced,
                projects,
                score
            }
        );

        alert(
            "Progress Saved"
        );
    };

    useEffect(() =>
    {
        loadProgress();
    }, [technology]);

    const [basics, setBasics]
        = useState(false);

    const [intermediate, setIntermediate]
        = useState(false);

    const [advanced, setAdvanced]
        = useState(false);

    const [projects, setProjects]
        = useState(0);

    const score =
        (basics ? 20 : 0)
        +
        (intermediate ? 30 : 0)
        +
        (advanced ? 30 : 0)
        +
        Math.min(
            projects * 5,
            20
        );

        const loadProgress =
        async () =>
        {
            const user =
                JSON.parse(
                    localStorage.getItem("user")
                );

            const response =
                await api.get(
                    "/progress"
                );

            const progress =
                response.data.find(x =>
                    x.username ===
                    user.username
                    &&
                    x.technology ===
                    technology.name
                );

            if (!progress)
                return;

            setBasics(
                progress.basics
            );

            setIntermediate(
                progress.intermediate
            );

            setAdvanced(
                progress.advanced
            );

            setProjects(
                progress.projects
            );
        };

    return (

        <div className="progress-card">

            <h1>
                {technology.name}
            </h1>

            <div className="progress-bar">

                <div
                    className="fill"
                    style={{
                        width: `${score}%`
                    }}
                />

            </div>

            <h2>
                {score}%
            </h2>

            <label>

                <input
                    type="checkbox"
                    checked={basics}
                    onChange={() =>
                        setBasics(!basics)
                    }
                />

                Basics

            </label>

            <label>

                <input
                    type="checkbox"
                    checked={intermediate}
                    onChange={() =>
                        setIntermediate(
                            !intermediate
                        )
                    }
                />

                Intermediate

            </label>

            <label>

                <input
                    type="checkbox"
                    checked={advanced}
                    onChange={() =>
                        setAdvanced(
                            !advanced
                        )
                    }
                />

                Advanced

            </label>

            <input
                type="number"
                value={projects}
                onChange={(e) =>
                    setProjects(
                        Number(
                            e.target.value
                        )
                    )
                }
            />

            <StatisticsCard
                score={score}
            />

            <div className="topics">

                {
                    technology.levels.map(level => (

                        <div
                            key={level.name}
                            className="topic-card"
                        >

                            <h3>
                                {level.name}
                            </h3>

                            {
                                level.topics.map(topic => (

                                    <p key={topic}>
                                        • {topic}
                                    </p>

                                ))
                            }

                        </div>

                    ))
                }

            </div>

            <button
                onClick={saveProgress}
            >
                Save Progress
            </button>
        </div>
    );
}