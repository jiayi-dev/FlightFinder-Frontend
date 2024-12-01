import FlightSegment from '../FlightSegment/FlightSegment.jsx';
import airports from '../../data/airports.json';
import airlines from '../../data/airline.json';
import './FlightCard.scss';

const airportMap = Object.values(airports).reduce((acc, airport) => {
    acc[airport.iata_code] = airport.name;
    return acc;
}, {});

const airlineMap = airlines.reduce((acc, airline) => {
    acc[airline.iata_code] = airline.name;
    return acc;
}, {});

function FlightCard({ departFlights, returnFlights }) {
    const formatFlightData = (flight) => {
        const airlineName = airlineMap[flight.airlineCode] || flight.airlineCode;

        const departAirportName = airportMap[flight.departAirport] || flight.departAirport;
        const arrivalAirportName = airportMap[flight.arrivalAirport] || flight.arrivalAirport;

        return {
            ...flight,
            airlineName,
            departAirportName,
            arrivalAirportName
        };
    };

    return (
        <div className="flight-card">
            <div className="flight-card__section flight-card__section--depart">
                <div className="flight-card__header flight-card__header--depart">
                    <h2 className="flight-card__title">Departing flight</h2>
                </div>
                <div className="flight-card__flights">
                    {departFlights.map((flight) => {
                        const formattedFlight = formatFlightData(flight);
                        return (
                            <FlightSegment
                                key={`${formattedFlight.flightNumber}-${formattedFlight.departTime}`}
                                flight={formattedFlight}
                            />
                        );
                    })}
                </div>
            </div>

            {returnFlights && returnFlights.length > 0 ? (
                <div className="flight-card__section flight-card__section--return">
                    <div className="flight-card__header flight-card__header--return">
                        <h2 className="flight-card__title">Returning flight</h2>
                    </div>
                    <div className="flight-card__flights">
                        {returnFlights.map((flight) => {
                            const formattedFlight = formatFlightData(flight);
                            return (
                                <FlightSegment
                                    key={`${formattedFlight.flightNumber}-${formattedFlight.departTime}`}
                                    flight={formattedFlight}
                                />
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="flight-card__section flight-card__section--no-return">
                    <div className="flight-card__no-return">
                        <p>No flights available</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FlightCard;
