export const isValidActivity = (activity) => {
    return (
        activity.steps > 0 &&
        activity.caloriesBurned > 0 &&
        activity.workoutMinutes > 0 &&
        typeof activity.goalAchieved === 'boolean'
    );
};
