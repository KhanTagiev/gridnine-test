import { useState, useEffect } from "react";

import FlightSearchSidebar from "./FlightSearchSidebar/FlightSearchSidebar";
import FlightSearchList from "./FlightSearchList/FlightSearchList";
import "./FlightsSearch.css";
import flightResult from "../../utils/flights.json";

function FlightsSearch() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    setFlights(flightResult.result.flights);
  }, []);

  return (
    <section className="section flight-search">
      <div className="flight-search__container">
        <FlightSearchSidebar />
        <FlightSearchList flights={flights} />
      </div>
    </section>
  );
}

export default FlightsSearch;
