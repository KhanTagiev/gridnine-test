import { useState, useEffect } from "react";

import FlightSearchSidebar from "./FlightSearchSidebar/FlightSearchSidebar";
import FlightSearchList from "./FlightSearchList/FlightSearchList";
import "./FlightsSearch.css";
import flightResult from "../../utils/flights.json";

function FlightsSearch() {
  const [flights, setFlights] = useState([]);
  const [filteredFlight, setFilteredFlights] = useState([]);
  const [flightSort, setFlightSort] = useState("price-up");
  const [transferFilter, setTransferFilter] = useState([]);
  const [minPriceDefault, setMinPriceDefault] = useState(0);
  const [maxPriceDefault, setMaxPriceDefault] = useState(150000);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(150000);
  const [airlinesCarrier, setAirlinesCarrier] = useState([]);
  const [airlinesFilter, setAirlinesFilter] = useState([]);

  useEffect(() => {
    setFlights(flightResult.result.flights);
    const priceArray = flightResult.result.flights.map(
      (item) => item.flight.price.total.amount
    );
    const newMinPrice = Math.min(...priceArray);
    const newMaxPrice = Math.max(...priceArray);
    const newAirlinesCarrier = Array.from(
      new Set(
        flightResult.result.flights.map((item) => item.flight.carrier.caption)
      )
    );
    setMinPriceDefault(newMinPrice);
    setMinPrice(newMinPrice);
    setMaxPriceDefault(newMaxPrice);
    setMaxPrice(newMaxPrice);
    setAirlinesCarrier(newAirlinesCarrier);
  }, []);

  useEffect(() => {
    if (flights.length > 0) {
      const flightPriceFiltered = flights.filter(
        (item) =>
          item.flight.price.total.amount >= Number(minPrice) &&
          item.flight.price.total.amount <= Number(maxPrice)
      );
      let flightTransferFiltered;
      if (transferFilter.length === 1 && transferFilter.includes("0")) {
        flightTransferFiltered = flightPriceFiltered.filter(
          (item) =>
            item.flight.legs[0].segments.length < 2 &&
            item.flight.legs[1].segments.length < 2
        );
      } else if (transferFilter.length === 1 && transferFilter.includes("1")) {
        flightTransferFiltered = flightPriceFiltered.filter(
          (item) =>
            item.flight.legs[0].segments.length > 1 ||
            item.flight.legs[1].segments.length > 1
        );
      } else {
        flightTransferFiltered = flightPriceFiltered;
      }
      let flightAirlinesFiltered;
      if (airlinesFilter.length > 0) {
        let airlinesFilterResult = [];

        airlinesFilter.forEach((airline) => {
          const newAirlineFilterResult = flightTransferFiltered.filter(
            (item) => item.flight.carrier.caption === airline
          );
          airlinesFilterResult.push(...newAirlineFilterResult);
        });
        flightAirlinesFiltered = airlinesFilterResult;
      } else {
        flightAirlinesFiltered = flightTransferFiltered;
      }
      if (flightSort === "price-up") {
        setFilteredFlights(
          flightAirlinesFiltered.sort(
            (a, b) => a.flight.price.total.amount - b.flight.price.total.amount
          )
        );
      }
      if (flightSort === "price-down") {
        setFilteredFlights(
          flightAirlinesFiltered.sort(
            (a, b) => b.flight.price.total.amount - a.flight.price.total.amount
          )
        );
      }
      if (flightSort === "travel-time") {
        setFilteredFlights(
          flightAirlinesFiltered.sort((a, b) => {
            return (
              a.flight.legs[0].duration +
              a.flight.legs[1].duration -
              b.flight.legs[0].duration -
              b.flight.legs[0].duration
            );
          })
        );
      }
    }
  }, [transferFilter, flightSort, flights, minPrice, maxPrice, airlinesFilter]);

  function handleChangeMinPrice(e) {
    setMinPrice(
      e.target.value < maxPrice &&
        e.target.value >= minPriceDefault &&
        e.target.value <= maxPriceDefault
        ? e.target.value
        : minPrice
    );
  }

  function handleChangeMaxPrice(e) {
    setMaxPrice(
      e.target.value > minPrice &&
        e.target.value >= minPriceDefault &&
        e.target.value <= maxPriceDefault
        ? e.target.value
        : maxPrice
    );
  }

  function handleChangeFlightSort(e) {
    setFlightSort(e.target.value);
  }

  function handleChangeTransferFilter(e) {
    if (e.target.checked) {
      setTransferFilter([...transferFilter, e.target.value]);
    } else {
      setTransferFilter(
        transferFilter.filter((item) => item !== e.target.value)
      );
    }
  }

  function handleChangeAirlinesFilter(e) {
    if (e.target.checked) {
      setAirlinesFilter([...airlinesFilter, e.target.value]);
    } else {
      setAirlinesFilter(
        airlinesFilter.filter((item) => item !== e.target.value)
      );
    }
  }

  return (
    <section className="section flight-search">
      <div className="flight-search__container">
        <FlightSearchSidebar
          flightSort={flightSort}
          onChangeFlightSort={handleChangeFlightSort}
          onChangeTransferFilter={handleChangeTransferFilter}
          minPrice={minPrice}
          minPriceDefault={minPriceDefault}
          maxPriceDefault={maxPriceDefault}
          maxPrice={maxPrice}
          onChangeMinPrice={handleChangeMinPrice}
          onChangeMaxPrice={handleChangeMaxPrice}
          airlinesCarrier={airlinesCarrier}
          onChangeAirlinesFilter={handleChangeAirlinesFilter}
        />
        <FlightSearchList flights={filteredFlight} />
      </div>
    </section>
  );
}

export default FlightsSearch;
