import React, { useState } from "react";
import { useTracker } from "../context/trackercontext";
import { isValidActivity } from "../utils/validation";
import ActivityItem from "../components/ActivityItem";

const Filter = () => {
    const { activities, loading } = useTracker();
    const [inputValue, setInputValue] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [filteredResults, setFilteredResults] = useState(null);

    const handleFilter = () => {
        if (!inputValue.trim()) {
            setErrorMsg("Input cannot be empty.");
            setFilteredResults(null);
            return;
        }

        const numericVal = Number(inputValue);
        if (isNaN(numericVal) || numericVal < 0) {
            setErrorMsg("Please enter a valid positive number for steps.");
            setFilteredResults(null);
            return;
        }

        setErrorMsg("");
        
        const results = activities
            .filter(isValidActivity)
            .filter(act => act.steps >= numericVal);

        setFilteredResults(results);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Filter Activities</h2>
            <div>
                <input 
                    type="number" 
                    placeholder="Enter minimum steps..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={handleFilter}>Filter</button>
            </div>
            
            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

            <div style={{ marginTop: "20px" }}>
                {filteredResults && (
                    <>
                        <h3>Results ({filteredResults.length})</h3>
                        {filteredResults.length > 0 ? (
                            filteredResults.map(act => (
                                <ActivityItem key={act.activityId} activity={act} />
                            ))
                        ) : (
                            <p>No activities match the filter.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Filter;
