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
      <form className="search-sidebar__filter-form">
        <p className="search-sidebar__filter-title">Сортировать</p>
        <ul className="search-sidebar__inputs-list">
          {radioMockFilters.map((radio) => (
            <li>
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
            </li>
          ))}
        </ul>
        <p className="search-sidebar__filter-title">Фильтровать</p>
        <ul className="search-sidebar__inputs-list">
          {checkboxMockFilters.map((checkbox) => (
            <li>
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
            </li>
          ))}
        </ul>
        <p className="search-sidebar__filter-title">Цена</p>
        <ul className="search-sidebar__inputs-list">
          <li className="search-sidebar__input-container search-sidebar__input-container_price">
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
          </li>
          <li>
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
          </li>
        </ul>
      </form>
    </div>
  );
}

export default FlightSearchSidebar;
