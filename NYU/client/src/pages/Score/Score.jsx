import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Score.css";

function Score() {
    const [riskPercentage, setRiskPercentage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRiskPercentage = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/getPercentage");
                setRiskPercentage(response.data.percentage);
            } catch (err) {
                setError("Failed to fetch risk percentage.");
            } finally {
                setLoading(false);
            }
        };
        fetchRiskPercentage();
    }, []);

    return (
        <div className="score-container">
            <h1>Heart Disease Risk Score</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <p>Your estimated risk percentage is: <strong>{riskPercentage}%</strong></p>
            )}
        </div>
    );
}

export default Score;
