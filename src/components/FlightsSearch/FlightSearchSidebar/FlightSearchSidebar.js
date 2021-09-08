import "./FlightSearchSidebar.css";

function FlightSearchSidebar({
  flightSort,
  onChangeFlightSort,
  onChangeTransferFilter,
  minPrice,
  minPriceDefault,
  maxPrice,
  maxPriceDefault,
  onChangeMinPrice,
  onChangeMaxPrice,
  airlinesCarrier,
  onChangeAirlinesFilter,
}) {
  const radioMockFilters = [
    {
      title: "по возрастанию цены",
      value: "price-up",
      id: "radio-1",
    },
    {
      title: "по убыванию цены",
      value: "price-down",
      id: "radio-2",
    },
    {
      title: "по времени в пути",
      value: "travel-time",
      id: "radio-3",
    },
  ];

  const checkboxMockFilters = [
    {
      title: "1 пересадка",
      value: "1",
      id: "checkbox-1",
    },
    {
      title: "без пересадок",
      value: "0",
      id: "checkbox-2",
    },
  ];

  return (
    <div className="search-sidebar">
      <form className="search-sidebar__form">
        <fieldset className="search-sidebar__fieldset">
          <legend className="search-sidebar__legend">Сортировать</legend>
          {radioMockFilters.map((radio) => (
            <label key={radio.id} className="search-sidebar__label">
              <input
                type="radio"
                className="search-sidebar__input search-sidebar__input_sort"
                name="flights-sort"
                value={radio.value}
                checked={flightSort === radio.value}
                onChange={onChangeFlightSort}
              />
              — {radio.title}
            </label>
          ))}
        </fieldset>
        <fieldset className="search-sidebar__fieldset">
          <legend className="search-sidebar__legend">Фильтровать</legend>
          {checkboxMockFilters.map((checkbox) => (
            <label key={checkbox.id} className="search-sidebar__label">
              <input
                type="checkbox"
                className="search-sidebar__input search-sidebar__input_filter"
                name="flights-filter"
                value={checkbox.value}
                onChange={onChangeTransferFilter}
              />
              — {checkbox.title}
            </label>
          ))}
        </fieldset>

        <fieldset className="search-sidebar__fieldset">
          <legend className="search-sidebar__legend">Цена</legend>
          <label className="search-sidebar__label">
            От
            <input
              type="number"
              className="search-sidebar__input search-sidebar__input_price"
              name="flights-price-down"
              value={minPrice}
              min={minPriceDefault}
              max={maxPriceDefault}
              placeholder="0"
              required
              onChange={onChangeMinPrice}
            />
          </label>
          <label className="search-sidebar__label">
            До
            <input
              type="number"
              className="search-sidebar__input search-sidebar__input_price"
              name="flights-up"
              value={maxPrice}
              min={minPriceDefault}
              max={maxPriceDefault}
              placeholder="50000"
              required
              onChange={onChangeMaxPrice}
            />
          </label>
        </fieldset>
        <fieldset className="search-sidebar__fieldset">
          <legend className="search-sidebar__legend">Авиалинии</legend>
          {airlinesCarrier.length > 0 ? (
            airlinesCarrier.map((airline) => (
              <label key={airline} className="search-sidebar__label">
                <input
                  type="checkbox"
                  className="search-sidebar__input search-sidebar__input_filter"
                  name="flights-filter"
                  value={airline}
                  onChange={onChangeAirlinesFilter}
                />
                — {airline}
              </label>
            ))
          ) : (
            <></>
          )}
        </fieldset>
      </form>
    </div>
  );
}

export default FlightSearchSidebar;
