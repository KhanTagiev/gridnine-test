import FlightSearchSidebar from "./FlightSearchSidebar/FlightSearchSidebar";
import FlightSearchList from "./FlightSearchList/FlightSearchList";
import "./FlightsSearch.css";

function FlightsSearch() {
  return (
    <section className="section flight-search">
      <div className="flight-search__container">
        <FlightSearchSidebar />
        <FlightSearchList />
      </div>
    </section>
  );
}

export default FlightsSearch;
