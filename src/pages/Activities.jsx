import React from "react";
import { useTracker } from "../context/trackercontext";
import { isValidActivity } from "../utils/validation";
import ActivityItem from "../components/ActivityItem";

const Activities = () => {
    const { activities, loading } = useTracker();

    if (loading) return <div>Loading...</div>;

    const validActivities = activities.filter(isValidActivity);

    return (
        <div>
            <h2>All Valid Activities</h2>
            {validActivities.length === 0 ? (
                <p>No valid activities found.</p>
            ) : (
                validActivities.map((act) => (
                    <ActivityItem key={act.activityId} activity={act} />
                ))
            )}
        </div>
    );
};

export default Activities;
