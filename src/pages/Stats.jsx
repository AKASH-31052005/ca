import React from "react";
import { useTracker } from "../context/trackercontext";
import { isValidActivity } from "../utils/validation";

const Stats = () => {
    const { activities, loading } = useTracker();

    if (loading) return <div>Loading...</div>;

    const validActivities = activities.filter(isValidActivity);

    const stats = validActivities.reduce((acc, act) => {
        acc.totalActivities += 1;
        if (act.goalAchieved) {
            acc.goalAchievedCount += 1;
        } else {
            acc.goalNotAchievedCount += 1;
        }
        return acc;
    }, { totalActivities: 0, goalAchievedCount: 0, goalNotAchievedCount: 0 });

    return (
        <div>
            <h2>Activities Analytics Dashboard</h2>
            
            <div style={{ border: "1px solid #ccc", padding: "20px", display: "inline-block", backgroundColor: "#f9f9f9" }}>
                <p><strong>Total Valid Activities:</strong></p>
                <div data-testid="total-activities">{stats.totalActivities}</div>
                
                <p><strong>Goal Achieved:</strong></p>
                <div data-testid="goal-achieved">{stats.goalAchievedCount}</div>
                
                <p><strong>Goal Not Achieved:</strong></p>
                <div data-testid="goal-not-achieved">{stats.goalNotAchievedCount}</div>
            </div>

            <p style={{ marginTop: "20px", fontStyle: "italic", color: "#555" }}>
                (Computed values are also exposed globally at `window.appState`)
            </p>
        </div>
    );
};

export default Stats;
