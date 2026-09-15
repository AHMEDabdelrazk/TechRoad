import { useEffect, useState } from "react";
import api from "../services/api";
import StatisticsCard from "./StatisticsCard";

export default function ProgressCard({ technology, onProgressSaved }) {
  const [basics, setBasics] = useState(false);
  const [intermediate, setIntermediate] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [projects, setProjects] = useState(0);
  const [serverScore, setServerScore] = useState(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Calculate optimistic client score preview
  const clientScore =
    (basics ? 20 : 0) +
    (intermediate ? 30 : 0) +
    (advanced ? 30 : 0) +
    Math.min(Math.max(0, projects) * 5, 20);

  const displayScore = serverScore !== null ? serverScore : clientScore;

  const loadProgress = async () => {
    try {
      const response = await api.get(`/progress/${encodeURIComponent(technology.name)}`);
      if (response.data) {
        setBasics(response.data.basics || false);
        setIntermediate(response.data.intermediate || false);
        setAdvanced(response.data.advanced || false);
        setProjects(response.data.projects || 0);
        setServerScore(response.data.score);
      }
    } catch {
      // Progress not yet saved for this tech, reset to defaults
      setBasics(false);
      setIntermediate(false);
      setAdvanced(false);
      setProjects(0);
      setServerScore(0);
    }
  };

  useEffect(() => {
    if (technology?.name) {
      setFeedback("");
      loadProgress();
    }
  }, [technology?.name]);

  const saveProgress = async () => {
    try {
      setSaving(true);
      setFeedback("");

      const response = await api.post("progress", {
        technology: technology.name,
        basics,
        intermediate,
        advanced,
        projects: Number(projects) || 0
      });

      if (response.data) {
        setServerScore(response.data.score);
      }

      setFeedback("Progress saved successfully!");
      if (onProgressSaved) {
        onProgressSaved();
      }

      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      setFeedback(err.response?.data?.message || "Failed to save progress. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!technology) return null;

  return (
    <div className="progress-card">
      <h1>{technology.name} Progress Tracker</h1>

      <div className="progress-bar">
        <div
          className="fill"
          style={{
            width: `${displayScore}%`,
            transition: "width 0.4s ease-in-out"
          }}
        />
      </div>

      <h2>Mastery: {displayScore}%</h2>

      {feedback && (
        <div style={{
          background: feedback.includes("failed") ? "#ffebee" : "#e8f5e9",
          color: feedback.includes("failed") ? "#c62828" : "#2e7d32",
          padding: "8px 12px",
          borderRadius: "6px",
          marginBottom: "12px",
          fontWeight: "500",
          textAlign: "center"
        }}>
          {feedback}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "15px 0" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={basics}
            onChange={(e) => {
              setBasics(e.target.checked);
              setServerScore(null);
            }}
          />
          <span><strong>Basics (20%)</strong> — Fundamental syntax, principles & concepts</span>
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={intermediate}
            onChange={(e) => {
              setIntermediate(e.target.checked);
              setServerScore(null);
            }}
          />
          <span><strong>Intermediate (30%)</strong> — Framework APIs, design patterns & best practices</span>
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={advanced}
            onChange={(e) => {
              setAdvanced(e.target.checked);
              setServerScore(null);
            }}
          />
          <span><strong>Advanced (30%)</strong> — Architecture, performance, security & deep internals</span>
        </label>

        <div style={{ marginTop: "10px" }}>
          <label style={{ display: "block", marginBottom: "6px" }}>
            <strong>Projects Built (5% each, max 20%):</strong>
          </label>
          <input
            type="number"
            min="0"
            max="10"
            value={projects}
            onChange={(e) => {
              setProjects(Math.max(0, parseInt(e.target.value, 10) || 0));
              setServerScore(null);
            }}
            style={{ width: "100px", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
        </div>
      </div>

      <StatisticsCard
        score={displayScore}
        projects={projects}
        basics={basics}
        intermediate={intermediate}
        advanced={advanced}
      />

      <div className="topics" style={{ marginTop: "20px" }}>
        {technology.levels && technology.levels.map((level) => (
          <div key={level.name} className="topic-card">
            <h3>{level.name}</h3>
            {level.topics && level.topics.map((topic) => (
              <p key={topic}>• {topic}</p>
            ))}
          </div>
        ))}
      </div>

      <button
        onClick={saveProgress}
        disabled={saving}
        style={{ marginTop: "20px", cursor: saving ? "wait" : "pointer" }}
      >
        {saving ? "Saving..." : "Save Progress"}
      </button>
    </div>
  );
}