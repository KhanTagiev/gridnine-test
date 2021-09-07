import "./FlightCard.css";
import carrierLogo from "../../../../images/carrier/airline.svg";

function FlightCard({ flight }) {
  return (
    <article className="flight-card">
      <div className="flight-card__header">
        <img
          src={carrierLogo}
          alt={flight.carrier.caption}
          className="flight-card__carrier-logo"
        />
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
              <p>
                {leg.segments[0].departureCity.caption},{" "}
                {leg.segments[0].departureAirport.caption}{" "}
                <span>({leg.segments[0].departureAirport.uid})</span>
              </p>
              {/*<p>{leg.segments[1].departureCity.caption}, {leg.segments[1].departureAirport.caption} <span>({leg.segments[1].departureAirport.uid})</span></p>*/}
            </div>
            <div className="flight-card__route-dates">
              <p>
                20:40 <span>18 авг. вт</span>
              </p>
              <p>◴ 14 ч 25 мин</p>
              <p>
                <span>19 авг. ср</span> 09:25
              </p>
            </div>
            <p className="flight-card__route-carrier">
              Рейс выполняет: {flight.carrier.caption}
            </p>
          </li>
        ))}
      </ul>
      <button
        className={`flight-card__btn`}
        type="button"
        aria-label="Кнопка"
        onClick={() => alert("Вы выбрали рейс")}
      >
        Выбрать
      </button>
    </article>
  );
}

export default FlightCard;
