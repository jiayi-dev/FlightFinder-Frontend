import React from 'react';
import { FaPlaneDeparture, FaPlaneArrival, FaClock, FaCalendarAlt, FaTimes } from 'react-icons/fa';
import { formatDate, formatDuration } from '../../utils/dateUtils';
import './FlightOverlay.scss';

const FlightOverlay = ({ flight, onClose }) => {
    if (!flight) return null;

    return (
        <div className="flight-overlay">
            <div className="flight-overlay__backdrop" onClick={onClose} />
            <div className="flight-overlay__content">
                <button className="flight-overlay__close" onClick={onClose}>
                    <FaTimes />
                </button>

                <div className="flight-overlay__header">
                    <h2>Flight Details</h2>
                </div>

                <div className="flight-overlay__body">
                    <div className="flight-overlay__route">
                        <div className="flight-overlay__airport">
                            <FaPlaneDeparture />
                            <div>
                                <h3>{flight.departAirport}</h3>
                                <p>Departure</p>
                            </div>
                        </div>
                        <div className="flight-overlay__separator">→</div>
                        <div className="flight-overlay__airport">
                            <FaPlaneArrival />
                            <div>
                                <h3>{flight.returnAirport}</h3>
                                <p>Arrival</p>
                            </div>
                        </div>
                    </div>

                    <div className="flight-overlay__info">
                        <div className="flight-overlay__dates">
                            <FaCalendarAlt />
                            <p>
                                {formatDate(flight.departDate)} - {formatDate(flight.returnDate)}
                            </p>
                        </div>
                        <div className="flight-overlay__duration">
                            <FaClock />
                            <p>Total Duration: {formatDuration(flight.departDuration)}</p>
                        </div>
                    </div>

                    <div className="flight-overlay__segments">
                        <div className="flight-overlay__segment">
                            <h3>Outbound Flight</h3>
                            <div className="flight-overlay__segment-info">
                                <p>Flight Number: {flight.departFlightSegments}</p>
                                <p>Duration: {formatDuration(flight.departDuration)}</p>
                            </div>
                        </div>

                        <div className="flight-overlay__segment">
                            <h3>Return Flight</h3>
                            <div className="flight-overlay__segment-info">
                                <p>Flight Number: {flight.returnFlightSegments}</p>
                                <p>Duration: {formatDuration(flight.returnDuration)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flight-overlay__price">
                        <div className="flight-overlay__price-info">
              <span className="flight-overlay__price-amount">
                {flight.price} {flight.currency}
              </span>
                            <button className="flight-overlay__book-button">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightOverlay;