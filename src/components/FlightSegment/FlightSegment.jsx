import './FlightSegment.scss';

function FlightSegment({ flight }) {
    return (
        <div className="flight-segment">
            <div className="flight-segment__header">
                <div className="flight-segment__airline">
                    <span>{flight.airlineName} {flight.flightNumber}</span>
                    <span className="flight-segment__aircraft">Aircraft: {flight.aircraft}</span>
                </div>
                <span className="flight-segment__duration">{flight.duration}</span>
            </div>
            <div className="flight-segment__route">
                <div className="flight-segment__point">
                    <div className="flight-segment__time">{flight.departTime.slice(0, 5)}</div>
                    <div className="flight-segment__airport">{flight.departAirportName}</div>
                    <div className="flight-segment__terminal">Terminal {flight.departTerminal}</div>
                </div>
                <div className="flight-segment__timeline">
                    <div className="flight-segment__line"></div>
                </div>
                <div className="flight-segment__point">
                    <div className="flight-segment__time">{flight.arrivalTime.slice(0, 5)}</div>
                    <div className="flight-segment__airport">{flight.arrivalAirportName}</div>
                    <div className="flight-segment__terminal">Terminal {flight.arrivalTerminal}</div>
                </div>
            </div>
        </div>
    );
}

export default FlightSegment;
