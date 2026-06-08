import {
    useEffect,
    useState
}
from "react";


import "../styles/dashboard.css";

import api
from "../services/api";

export default function DashboardStats()
{
    const [progress,
        setProgress]
        = useState([]);

    useEffect(() =>
    {
        api.get("/progress")
            .then(res =>
            {
                setProgress(
                    res.data
                );
            });

    }, []);

    const total =
        progress.reduce(
            (sum, p) =>
            sum + p.score,
            0
        );

    const average =
        progress.length
        ?
        Math.round(
            total /
            progress.length
        )
        :
        0;

    return (

        <div
            className="stats-grid"
        >

            <div
                className="stat-card"
            >
                <h2>
                    {progress.length}
                </h2>

                <p>
                    Technologies
                </p>
            </div>

            <div
                className="stat-card"
            >
                <h2>
                    {average}%
                </h2>

                <p>
                    Average Score
                </p>
            </div>

        </div>

    );
}