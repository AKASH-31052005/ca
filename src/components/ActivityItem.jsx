import React from "react";
import { Link } from "react-router-dom";
import { useTracker } from "../context/trackercontext";

const ActivityItem = ({ activity }) => {
    const { toggleGoal } = useTracker();
    const displayName = activity.name ? activity.name : "Unknown";
    const displayDate = activity.date ? activity.date : "No Date";

    return (
        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }} data-testid="activity-item">
            <h3>{displayName} - {displayDate}</h3>
            <p>Steps: {activity.steps}</p>
            <p>Calories Burned: {activity.caloriesBurned}</p>
            <p>Workout Minutes: {activity.workoutMinutes}</p>
            <p>Goal Achieved: {activity.goalAchieved ? "Yes" : "No"}</p>
            <button onClick={() => toggleGoal(activity.activityId)}>
                Toggle Goal Status
            </button>
            {" "}
            <Link to={`/activities/${activity.activityId}`}>
                <button>View Details</button>
            </Link>
        </div>
    );
};

export default ActivityItem;
