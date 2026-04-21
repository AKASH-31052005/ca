export const TrackerReducer = (state, action) => {
    switch (action.type) {
        case "SET_ACTIVITIES": {
            const processedActivities = action.payload.map((a) => {
                if (a.steps >= 8000 && a.goalAchieved !== true) {
                    return { ...a, goalAchieved: true };
                }
                return a;
            });
            return {
                ...state,
                activities: processedActivities,
                loading: false,
            };
        }
        case "TOGGLE_GOAL": {
            return {
                ...state,
                activities: state.activities.map((a) => {
                    if (a.activityId === action.payload) {
                        const isValid = typeof a.goalAchieved === 'boolean';
                        if (!isValid) return a;

                        if (a.steps >= 8000) {
                            if (a.goalAchieved !== true) {
                                return { ...a, goalAchieved: true };
                            }
                            return a;
                        }
                        return { ...a, goalAchieved: !a.goalAchieved };
                    }
                    return a;
                }),
            };
        }
        default:
            return state;
    }
};
