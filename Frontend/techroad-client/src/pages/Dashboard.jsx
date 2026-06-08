import {
    useEffect,
    useState
}
from "react";

import api
from "../services/api";

import Navbar from "../components/Navbar";

import Sidebar
from "../components/Sidebar";

import TechnologyGroup
from "../components/TechnologyGroup";

import ProgressCard
from "../components/ProgressCard";

import RoadmapTimeline
from "../components/RoadmapTimeline";

import "../styles/dashboard.css";

export default function Dashboard() {

    const [search,
        setSearch]
        = useState("");
    const [categories,
        setCategories]
        = useState([]);

    const [selectedCategory,
        setSelectedCategory]
        = useState(null);

    const [selectedTech,
        setSelectedTech]
        = useState(null);

    useEffect(() => {

        api.get("/roadmap")
            .then(response => {

                setCategories(
                    response.data
                );

                setSelectedCategory(
                    response.data[0]
                );

            });

    }, []);

    const grouped =
        selectedCategory
            ?.technologies
            ?.reduce((acc, tech) => {

                if (!acc[tech.group]) {

                    acc[tech.group] = [];

                }

                acc[tech.group]
                    .push(tech);

                return acc;

            }, {});

    return (
    <>
        <Navbar />
        <div className="layout">

            <Sidebar
                categories={categories}
                selectedCategory={
                    selectedCategory
                }
                setSelectedCategory={
                    setSelectedCategory
                }
            />

            <div className="main-content">
                <input
                        className="search-box"
                        placeholder=
                        "Search Technology"

                        value={search}

                        onChange={(e)=>
                            setSearch(
                                e.target.value
                            )
                        }
                    />
                <h1>
                    {selectedCategory?.name}
                </h1>
                <div className="hero">

                    <h1>
                        Become a Professional 
                        {selectedCategory?.name}
                         Developer
                    </h1>

                    <p>
                        Select technologies,
                        follow the roadmap,
                        track your progress.
                    </p>

                    

                </div>
                <div className="guide-box">

                {
                    selectedTech
                        ? `Current Technology: ${selectedTech.name}`
                        : selectedCategory?.guide
                }

                </div>

                {
                    grouped &&
                    Object.entries(grouped)
                    .map(
                    ([group, technologies]) => (

                    <TechnologyGroup
                        key={group}
                        title={group}

                        technologies={
                            technologies.filter(
                                tech =>
                                    tech.name
                                        .toLowerCase()
                                        .includes(
                                            search.toLowerCase()
                                        )
                            )
                        }

                        setSelectedTech={
                            setSelectedTech
                        }
                    />

                    ))
                }

                {
                    selectedTech &&
                    (
                        <>
                            <RoadmapTimeline
                                technology={
                                    selectedTech
                                }
                            />
                        </>
                    )
                }

                {
                    selectedTech &&

                    <ProgressCard
                        technology={
                            selectedTech
                        }
                    />
                }

            </div>

        </div>
        </>

    );
}