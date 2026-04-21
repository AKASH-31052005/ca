import React from "react";
import { useParams, Link } from "react-router-dom";
import { useTracker } from "../context/trackercontext";

const ActivityDetail = () => {
    const { id } = useParams();
    const { activities, loading } = useTracker();

    if (loading) return <div>Loading...</div>;

    const activity = activities.find((act) => String(act.activityId) === String(id));

    if (!activity) {
        return <h2>Activity not found</h2>;
    }

    const efficiency = activity.workoutMinutes > 0 
        ? (activity.caloriesBurned / activity.workoutMinutes).toFixed(2)
        : 0;

    const displayName = activity.name ? activity.name : "Unknown";
    const displayDate = activity.date ? activity.date : "No Date";

    return (
        <div>
            <h2>Activity Details</h2>
            <h3>{displayName}</h3>
            <p><strong>Date:</strong> {displayDate}</p>
            <p><strong>Steps:</strong> {activity.steps}</p>
            <p><strong>Calories Burned:</strong> {activity.caloriesBurned}</p>
            <p><strong>Workout Minutes:</strong> {activity.workoutMinutes}</p>
            <p><strong>Goal Achieved:</strong> {activity.goalAchieved ? "Yes" : "No"}</p>
            
            <div style={{ marginTop: "1rem", padding: "10px", backgroundColor: "#eef", border: "1px solid #ccd" }}>
                <h4>Efficiency Score</h4>
                <p>{efficiency} (calories / min)</p>
            </div>

            <br />
            <Link to="/activities">Back to list</Link>
        </div>
    );
};

export default ActivityDetail;
