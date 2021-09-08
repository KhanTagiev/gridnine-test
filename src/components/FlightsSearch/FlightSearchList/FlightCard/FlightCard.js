import "./FlightCard.css";
import carrierLogo from "../../../../images/carrier/airline.svg";

function FlightCard({ flight }) {
  function dateFormatter(str) {
    const days = ["пн.", "вт.", "ср.", "чт.", "пт.", "сб.", "вс."];
    const months = [
      "янв.",
      "фев.",
      "мар.",
      "апр.",
      "мая",
      "июня",
      "июля",
      "авг.",
      "сен.",
      "окт.",
      "ноя.",
      "дек.",
    ];

    const date = new Date(str);
    const getDate = date.getDate();
    const getMonth = date.getMonth();
    const getDay = date.getDay();

    return `${getDate} ${months[getMonth]} ${days[getDay - 1]}`;
  }

  function timeFormatter(str) {
    const date = new Date(str);
    const hours = String(date.getHours());
    const minutes = String(date.getMinutes());

    return `${hours.length === 1 ? `0${hours}` : hours}:${
      minutes.length === 1 ? `0${minutes}` : minutes
    }`;
  }

  function durationToTimeFormatter(num) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours} ч ${minutes} мин`;
  }

  return (
    <article className="flight-card">
      <div className="flight-card__header">
        <div className="flight-card__carrier-container">
          <img
            src={carrierLogo}
            alt={flight.carrier.caption}
            className="flight-card__carrier-logo"
          />
          <p className="flight-card__carrier-text">{flight.carrier.caption}</p>
        </div>
        <div className="flight-card__price">
          <p className="flight-card__price-count">
            {flight.price.total.amount} &#8381;
          </p>
          <p className="flight-card__price-info">
            Стоимость для одного взрослого пассажира
          </p>
        </div>
      </div>
      <ul className="flight-card__routes-list">
        {flight.legs.map((leg) => (
          <li className="flight-card__route-container">
            <div className="flight-card__route-title">
              <p className="flight-card__text">
                {leg.segments[0].departureCity.caption},{" "}
                {leg.segments[0].departureAirport.caption}
                <span className="flight-card__text_blue">
                  ({leg.segments[0].departureAirport.uid})
                </span>
                <span className="flight-card__text_blue">&rarr;</span>
                {
                  leg.segments[leg.segments.length - 1].arrivalCity.caption
                },{" "}
                {leg.segments[leg.segments.length - 1].arrivalAirport.caption}
                <span className="flight-card__text_blue">
                  ({leg.segments[leg.segments.length - 1].arrivalCity.uid})
                </span>
              </p>
            </div>
            <div className="flight-card__route-dates">
              <p className="flight-card__text">
                {timeFormatter(leg.segments[0].departureDate)}
                <span className="flight-card__text_blue">
                  {dateFormatter(leg.segments[0].departureDate)}
                </span>
              </p>

              <p className="flight-card__text">
                &#128337;{" "}
                {durationToTimeFormatter(leg.segments[0].travelDuration)}
              </p>
              <p className="flight-card__text">
                <span className="flight-card__text_blue">
                  {dateFormatter(
                    leg.segments[leg.segments.length - 1].arrivalDate
                  )}
                </span>
                {timeFormatter(
                  leg.segments[leg.segments.length - 1].arrivalDate
                )}
              </p>
              {leg.segments.length > 1 ? (
                <p className="flight-card__transfer-info">1 пересадка</p>
              ) : null}
            </div>
            <div className="flight-card__route-carrier">
              <p className="flight-card__text">
                Рейс выполняет: {flight.carrier.caption}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <button
        className={`flight-card__btn`}
        type="button"
        aria-label="Кнопка"
        onClick={() =>
          alert(
            `Вы выбрали рейс от ${flight.carrier.caption} стоимостью ${flight.price.total.amount} рублей`
          )
        }
      >
        Выбрать
      </button>
    </article>
  );
}

export default FlightCard;
