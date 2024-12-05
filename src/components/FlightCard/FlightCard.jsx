import {useEffect, useState} from 'react';
import { FaPlaneDeparture } from 'react-icons/fa';
import { formatDate, formatDuration,airlineMap,airportMap } from '../../utils/dateUtils';
import FlightOverlay from "../FlightOverlay/FlightOverlay.jsx";
import {fetchSegment} from "../../services/flightApi.js";

const FlightCard = ({ flight }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [segment, setSegment] = useState({ departFlights: [], returnFlights: [] });

    const handleClick = () => {
        setShowDetails(true);
    };

    useEffect(() => {
        const fetchFlight = async () => {
            try{
                const response = await fetchSegment(flight);
                setSegment(response);
            }catch (error) {
                console.log(error);
            }
        }
        fetchFlight();
    },[])

    return (
        <>
            <div className="flight-card" onClick={handleClick}>
                <div className="flight-card__header">
                    <div className="flight-card__route">
                        <span className="flight-card__origin">{flight.departAirport}</span>
                        <FaPlaneDeparture className="flight-card__icon" />
                        <span className="flight-card__destination">{flight.returnAirport}</span>
                    </div>
                    <div className="flight-card__dates">
                        <span>{formatDate(flight.departDate)} - {formatDate(flight.returnDate)}</span>
                    </div>
                </div>

                <div className="flight-card__details">
                    <div className="flight-card__segment">
                        <span className="flight-card__segment-title">Depart:</span>
                        <span>
    {segment.departFlights.reduce((acc, flight, index, flights) => {
        const departure = flight.departAirport;
        const arrival = flight.arrivalAirport;
        const nextFlight = flights[index + 1];

        if (index === 0) {
            acc.push(departure);
        }

        if (!acc.includes(arrival)) {
            acc.push(arrival);
        }

        return acc;
    }, []).join(' - ')}
</span>

                        <span className="flight-card__duration">
              {formatDuration(flight.departDuration)}
            </span>
                    </div>
                    <div className="flight-card__segment">
                        <span className="flight-card__segment-title">Return:</span>
                        <span> {segment.returnFlights.reduce((acc, flight, index, flights) => {
                            const departure = flight.departAirport;
                            const arrival = flight.arrivalAirport;
                            const nextFlight = flights[index + 1];

                            if (index === 0) {
                                acc.push(departure);
                            }

                            if (!acc.includes(arrival)) {
                                acc.push(arrival);
                            }

                            return acc;
                        }, []).join(' - ')}</span>
                        <span className="flight-card__duration">
              {formatDuration(flight.returnDuration)}
            </span>
                    </div>
                </div>

                <div className="flight-card__price">
                    <span>{(flight.price * 1.48).toFixed(2)} CAD</span>
                </div>

            </div>

            {showDetails && (
                <FlightOverlay
                    flight={flight}
                    onClose={() => setShowDetails(false)}
                />
            )}
        </>
    );
};

export default FlightCard;