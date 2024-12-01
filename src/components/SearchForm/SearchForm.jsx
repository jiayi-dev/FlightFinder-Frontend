import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ArrowLeftRight } from 'lucide-react';
import TripTypeSwitch from '../TripTypeSwitch/TripTypeSwitch';
import TravelersSelect from '../TravelersSelect/TravelersSelect';
import AirportSearch from '../AirportSearch/AirportSearch';
import DateSelect from '../DateSelect/DateSelect';
import './SearchForm.scss';

const TRIP_TYPE_ROUND_TRIP = 'roundTrip';
const TRIP_TYPE_ONE_WAY = 'oneWay';

function SearchForm() {
    const navigate = useNavigate();
    const [tripType, setTripType] = useState(TRIP_TYPE_ROUND_TRIP);
    const [fromAirport, setFromAirport] = useState('');
    const [toAirport, setToAirport] = useState('');
    const [departDate, setDepartDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);
    const [isTravelersOpen, setIsTravelersOpen] = useState(false);
    const [travelers, setTravelers] = useState({
        adults: 1,
        youth: 0,
        children: 0
    });

    const updateTravelerCount = (type, newValue) => {
        setTravelers((prev) => {
            const updatedTravelers = { ...prev };

            updatedTravelers[type] = Math.max(0, Math.min(9, newValue));

            return updatedTravelers;
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();

        if (!fromAirport || !toAirport || !departDate) {
            alert("Please fill in all required fields.");
            return;
        }

        const searchData = {
            origin: fromAirport,
            destination: toAirport,
            departDate: departDate,
            returnDate: returnDate,
            numberOfAdults: travelers.adults + travelers.youth + travelers.children,
        };

        navigate('/search', { state: { searchData } });
    };

    const tripTypes = [
        { value: TRIP_TYPE_ROUND_TRIP, label: 'Round-trip' },
        { value: TRIP_TYPE_ONE_WAY, label: 'One-way' },
    ];

    const swapAirports = () => {
        setFromAirport(toAirport);
        setToAirport(fromAirport);
    };

    return (
        <div className="flight-search">
            <div className="flight-search__container">
                <div className="flight-search__header">
                    <TripTypeSwitch
                        tripTypes={tripTypes}
                        selectedType={tripType}
                        onSelect={setTripType}
                    />
                </div>

                <form onSubmit={handleSearch} className="flight-search__form">
                    <div className="flight-search__grid">
                        <div className="flight-search__field">
                            <AirportSearch
                                label="From"
                                value={fromAirport}
                                onChange={setFromAirport}
                                placeholder="Flight from?"
                            />
                        </div>
                        <button type="button" className="swap-button" onClick={swapAirports}>
                            <ArrowLeftRight />
                        </button>
                        <div className="flight-search__field">
                            <AirportSearch
                                label="To"
                                value={toAirport}
                                onChange={setToAirport}
                                placeholder="Where to?"
                            />
                        </div>
                    </div>

                    <div className="flight-search__dates">
                        <DateSelect
                            label="Depart"
                            selected={departDate}
                            onChange={setDepartDate}
                        />
                        <DateSelect
                            label="Return"
                            selected={returnDate}
                            onChange={setReturnDate}
                            disabled={tripType === TRIP_TYPE_ONE_WAY}
                        />
                        <div className="travelers">
                            <div
                                className="travelers__field"
                                onClick={() => setIsTravelersOpen(!isTravelersOpen)}
                            >
                                <div className="travelers__content">
                                    <Users className="travelers__icon" />
                                    <div className="travelers__info">
                                        <p className="travelers__label">Travelers</p>
                                        <p className="travelers__value">
                                            {travelers.adults +
                                                travelers.youth +
                                                travelers.children }{' '}
                                            passengers
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {isTravelersOpen && (
                                <TravelersSelect
                                    travelers={travelers}
                                    setTravelers={setTravelers}
                                    onClose={() => setIsTravelersOpen(false)}
                                    updateTravelerCount={updateTravelerCount}
                                />
                            )}
                        </div>
                    </div>

                    <button type="submit" className="flight-search__submit">
                        Search Flights
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SearchForm;
