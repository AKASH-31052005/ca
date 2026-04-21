import React from "react";
import { TrackerProvider } from "./context/trackercontext";
import AppRouter from "./routes/AppRouter";
import "./App.css";

function App() {
    return (
        <TrackerProvider>
            <AppRouter />
        </TrackerProvider>
    );
}

export default App;
