import { useState, useEffect } from "react";

import FlightSearchSidebar from "./FlightSearchSidebar/FlightSearchSidebar";
import FlightSearchList from "./FlightSearchList/FlightSearchList";
import "./FlightsSearch.css";
import flightResult from "../../utils/flights.json";

function FlightsSearch() {
  const [flights, setFlights] = useState([]);
  const [filteredFlight, setFilteredFlights] = useState([]);
  const [minPriceDefault, setMinPriceDefault] = useState(0);
  const [maxPriceDefault, setMaxPriceDefault] = useState(50000);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);

  useEffect(() => {
    setFlights(flightResult.result.flights);
    const priceArray = flightResult.result.flights.map(item => item.flight.price.totalFeeAndTaxes.amount);
    const newMinPrice = Math.min(...priceArray)
    const newMaxPrice = Math.max(...priceArray)
    setMinPriceDefault(newMinPrice);
    setMinPrice(newMinPrice)
    setMaxPriceDefault(newMaxPrice);
    setMaxPrice(newMaxPrice)
  }, []);

  useEffect(() => {
    if (flights.length > 0) {
      const newFilteredFlight = flights.filter(item => item.flight.price.totalFeeAndTaxes.amount >= Number(minPrice) && item.flight.price.totalFeeAndTaxes.amount <= Number(maxPrice))
      setFilteredFlights(newFilteredFlight);
      console.log(minPrice);
      console.log(maxPrice);
      console.log(newFilteredFlight);
    }
  }, [flights, minPrice, maxPrice])

  function handleChangeMinPrice(e) {
    setMinPrice(e.target.value < maxPrice && e.target.value >= minPriceDefault && e.target.value <= maxPriceDefault ? e.target.value : minPrice)
  }

  function handleChangeMaxPrice(e) {
    setMaxPrice(e.target.value > minPrice && e.target.value >= minPriceDefault && e.target.value <= maxPriceDefault ? e.target.value : maxPrice)
  }

  return (
    <section className="section flight-search">
      <div className="flight-search__container">
        <FlightSearchSidebar minPrice={minPrice} minPriceDefault={minPriceDefault} maxPriceDefault={maxPriceDefault} maxPrice={maxPrice} onChangeMinPrice={handleChangeMinPrice} onChangeMaxPrice={handleChangeMaxPrice} />
        <FlightSearchList flights={filteredFlight} />
      </div>
    </section>
  );
}

export default FlightsSearch;
