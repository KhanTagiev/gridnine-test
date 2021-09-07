import { useState, useEffect } from "react";

import FlightCard from "./FlightCard/FlightCard";
import "./FlightSearchList.css";

function FlightSearchList({ flights }) {
  const [filteredFlight, setFilteredFlights] = useState([]);
  const [flightsCount, setFlightsCount] = useState(2);
  const [flightsAddCount, setFlightsAddCount] = useState(0);

  useEffect(() => {
    setFilteredFlights(flights);
    setFlightsAddCount(2);
  }, [flights]);

  function onAddFlights() {
    setFlightsCount(flightsCount + flightsAddCount);
  }

  return (
    <div className="search-list">
      <ul className="search-list__container">
        {filteredFlight.length > 0 ? (
          filteredFlight
            .slice(0, flightsCount)
            .map((item) => (
              <FlightCard key={item.flightToken} flight={item.flight} />
            ))
        ) : (
          <div className="search-list__not-found">
            <p>Ничего не найдено</p>
          </div>
        )}
      </ul>
      <div className="search-list__btn-container">
        <button
          className={`search-list__btn ${
            flightsCount >= flights.length ? "search-list__btn_hide" : ""
          }`}
          type="button"
          aria-label="Кнопка"
          onClick={onAddFlights}
        >
          Показать ещё
        </button>
      </div>
    </div>
  );
}

export default FlightSearchList;
