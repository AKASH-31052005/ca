import { createContext, useContext, useReducer, useEffect } from "react";
import { TrackerReducer } from "../reducer/TrackerReducer";
import { getToken, getDataset } from "../api/api";

const initialState = {
    activities: [],
    loading: true,
};

export const TrackerContext = createContext();

export const TrackerProvider = ({ children }) => {
    const [state, dispatch] = useReducer(TrackerReducer, initialState);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const tokenRes = await getToken(
                    "E0123026",
                    "132271"
                );

                const data = await getDataset(tokenRes.token, tokenRes.dataUrl);

                dispatch({ type: "SET_ACTIVITIES", payload: data || [] });
            } catch (err) {
                console.error("Error fetching data:", err.message);
                dispatch({ type: "SET_ACTIVITIES", payload: [] });
            }
        };

        fetchActivities();
    }, []);

    useEffect(() => {
        const validActivities = state.activities.filter((act) =>
            act.steps > 0 &&
            act.caloriesBurned > 0 &&
            act.workoutMinutes > 0 &&
            typeof act.goalAchieved === 'boolean'
        );

        const stats = validActivities.reduce((acc, act) => {
            acc.totalActivities += 1;
            if (act.goalAchieved) {
                acc.goalAchievedCount += 1;
            } else {
                acc.goalNotAchievedCount += 1;
            }
            return acc;
        }, { totalActivities: 0, goalAchievedCount: 0, goalNotAchievedCount: 0 });

        window.appState = stats;
    }, [state.activities]);

    const toggleGoal = (activityId) => {
        dispatch({ type: "TOGGLE_GOAL", payload: activityId });
    };

    return (
        <TrackerContext.Provider
            value={{
                activities: state.activities,
                loading: state.loading,
                toggleGoal,
            }}
        >
            {children}
        </TrackerContext.Provider>
    );
};

export const useTracker = () => useContext(TrackerContext);