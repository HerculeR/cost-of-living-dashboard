import React, { useState, useEffect } from "react";
import ChartDisplay from "./ChartDisplay";

export default function CitySelector() {
  const [data, setData] = useState(null);
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  // 1️⃣ Fetch data on mount
  useEffect(() => {
    fetch("/cost-of-living.json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((json) => {
        setData(json);
        const cities = Object.keys(json);
        setCityList(cities);
        setSelectedCity(cities[0]);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // 2️⃣ Track viewport width
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 600);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3️⃣ Loading / error / no‐data states
  if (loading) return <div className="spinner"></div>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!data) return null;

  const costs = data[selectedCity];

  return (
    <div className="selector-container">
      {/* City selector */}
      <label htmlFor="citySelect">Select City:&nbsp;</label>
      <select
        id="citySelect"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        {cityList.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {/* Mobile‐only header */}
      {isMobile && (
        <h2 className="mobile-title">{selectedCity} Monthly Costs</h2>
      )}

      {/* Cost cards */}
      <div className="cards-wrapper">
        {["rent", "food", "transport", "misc"].map((key) => (
          <div className="card" key={key}>
            <h3>{key}</h3>
            <p>${costs[key]}</p>
          </div>
        ))}
      </div>

      {/* Chart display */}
      <div className="chart-container">
        <ChartDisplay data={costs} />
      </div>
    </div>
  );
}
