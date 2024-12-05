import React from 'react';
import FlightCard from '../FlightCard/FlightCard'
import './FlightMatrix.scss';

const FlightMatrix = ({ flights }) => {
    if (!Array.isArray(flights) || !flights.length || !Array.isArray(flights[0])) {
        return <div className="flight-matrix__empty">No flights available</div>;
    }

    return (
        <div className="flight-matrix">
            <div className="flight-matrix__grid">
                {flights.map((row, rowIndex) => (
                    <div key={`row-${rowIndex}`} className="flight-matrix__row">
                        {row.map((flight) => (
                            <div key={flight.id} className="flight-matrix__cell">
                                <FlightCard flight={flight} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlightMatrix;