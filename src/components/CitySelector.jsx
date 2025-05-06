import { useState } from "react";
import { cityData } from "../data.js";
import ChartDisplay from "./ChartDisplay";

const cities = Object.keys(cityData);

function CitySelector() {
  const [city, setCity] = useState(cities[0]);
  const costs = cityData[city];

  return (
    <div className="selector-container">
      <label htmlFor="citySelect">Select City:&nbsp;</label>
      <select
        id="citySelect"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      >
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Card layout */}
      <div className="cards-wrapper">
        {Object.entries(costs).map(([key, value]) => (
          <div className="card" key={key}>
            <h3>{key}</h3>
            <p>${value}</p>
          </div>
        ))}
      </div>

      {/* Bar chart below cards */}
      <ChartDisplay data={costs} />
    </div>
  );
}

export default CitySelector;
