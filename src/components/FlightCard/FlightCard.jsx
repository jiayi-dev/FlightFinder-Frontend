import {useState} from 'react';
import { FaPlaneDeparture } from 'react-icons/fa';
import { formatDate, formatDuration } from '../../utils/dateUtils';
import FlightOverlay from "../FlightOverlay/FlightOverlay.jsx";

const FlightCard = ({ flight }) => {
    const [showDetails, setShowDetails] = useState(false);

    const handleClick = () => {
        setShowDetails(true);
    };

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
                        <span>{flight.departFlightSegments}</span>
                        <span className="flight-card__duration">
              {formatDuration(flight.departDuration)}
            </span>
                    </div>
                    <div className="flight-card__segment">
                        <span className="flight-card__segment-title">Return:</span>
                        <span>{flight.returnFlightSegments}</span>
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