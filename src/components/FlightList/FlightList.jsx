import React from 'react';
import FlightCard from '../FlightCard/FlightCard.jsx';
import './FlightList.scss';



const FlightList = ({ flights = [] }) => {
    // Handle both array and single object cases
    const flightData = Array.isArray(flights)
        ? flights
        : (flights ? [flights] : []);

    if (!flightData.length) {
        return <div className="flight-list__empty">No flights found</div>;
    }

    // Ensure each flight has a unique ID
    const flightsWithIds = flightData.map(flight => ({
        ...flight,
        id: flight.id || `${flight.departAirport}-${flight.returnAirport}-${flight.departDate}-${flight.returnDate}`
    }));

    return (
        <div className="flight-list">
            {flightsWithIds.map((flight) => (
                <FlightCard
                    key={flight.id}
                    flight={flight}
                />
            ))}
        </div>
    );
};

export default FlightList;