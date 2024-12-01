import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';
import FlightCard from '../../components/FlightCard/FlightCard.jsx';
import TextSpinnerLoader from '../../components/TextSpinner/TextSpinner';
import './SearchResults.scss';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const SearchResults = () => {
    const { state } = useLocation();
    const { searchData } = state || {};
    const [offer, setOffer] = useState([]);
    const [flight, setFlight] = useState({ departFlights: [], returnFlights: [] });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [priority, setPriority] = useState('price');
    const navigate = useNavigate();

    const [isFlexible, setIsFlexible] = useState(false);
    const [lastRequestTime, setLastRequestTime] = useState(null);

    const updatedSearchData = useMemo(() => {
        return {
            ...searchData,
            departDate: searchData?.departDate ? new Date(searchData.departDate).toISOString().slice(0, 10) : '',
            returnDate: searchData?.returnDate ? new Date(searchData.returnDate).toISOString().slice(0, 10) : '',
            priceOrDuration: priority,
        };
    }, [searchData, priority]);

    const fetchFlightsByNumbers = async (flightNumbers) => {
        const requests = flightNumbers.map((flightNumber) =>
            axios.get(`${apiBaseUrl}/flight/flightnumber/${flightNumber}`)
        );
        try {
            const responses = await Promise.all(requests);
            return responses.map(response => response.data.data);
        } catch (error) {
            setError('Error fetching flight details');
            console.error(error);
            return [];
        }
    };

    const handleOffer = async () => {
        setIsLoading(true);
        let attempt = 0;
        const maxAttempts = 2;

        while (attempt < maxAttempts) {
            try {
                attempt++;
                const response = await axios.post(`${apiBaseUrl}/offer/one`, updatedSearchData);
                const offerData = response.data.data;
                fetchFlight(offerData);
            } catch (error) {
                if (attempt === maxAttempts) {
                    setError('There was an error loading the flight details.');
                    console.error(error);
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    const fetchFlight = async (offerData) => {
        if (offerData) {
            const departSegments = offerData.departFlightSegments?.split('-') || [];
            const returnSegments = offerData.returnFlightSegments?.split('-') || [];

            const departFlights = await fetchFlightsByNumbers(departSegments);
            const returnFlights = await fetchFlightsByNumbers(returnSegments);

            setFlight({ departFlights, returnFlights });
        }
    };

    const fetchMetricData = async () => {
        if (!isFlexible) return;

        const now = Date.now();
        if (lastRequestTime && now - lastRequestTime < 500) return;
        setLastRequestTime(now);

        setIsLoading(true);

        try {
            const response = await axios.post(`${apiBaseUrl}/offer/matrix`, {
                origin: searchData?.origin,
                destination: searchData?.destination,
                departDate: updatedSearchData.departDate,
                returnDate: updatedSearchData.returnDate,
                numberOfAdults: searchData?.travelers?.adults || 1
            });
        } catch (error) {
            setError('Error fetching metric data');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMetricData();
    }, [isFlexible, updatedSearchData, lastRequestTime]);

    useEffect(() => {
        handleOffer();
    }, [priority]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date) ? date.toLocaleDateString() : 'Invalid date';
    };

    const handleCheckboxChange = (event) => {
        setIsFlexible(event.target.checked);
    };

    return (
        <div className="search-results">
            {error && <div className="search-results__error">{error}</div>}

            {isLoading ? (
                <div className="search-results__loading">
                    <TextSpinnerLoader />
                </div>
            ) : (
                <div className="search-results__main">
                    <div className="search-results__header">
                        <div className="search-results__route">
                            <span className="search-results__route-origin">{updatedSearchData?.origin}</span>
                            <span className="search-results__route-separator">-</span>
                            <span className="search-results__route-destination">{updatedSearchData?.destination}</span>
                        </div>
                        <div className="search-results__details">
                            <div className="search-results__detail">
                                <FaUser className="search-results__icon" />
                                <span>{searchData?.travelers?.adults || 1} passenger | Economy</span>
                            </div>
                            <div className="search-results__detail">
                                <FaCalendarAlt className="search-results__icon" />
                                <span>{formatDate(searchData?.departDate)} - {formatDate(searchData?.returnDate)}</span>
                            </div>
                        </div>
                        <Link to="/" className="search-results__search-button">
                            Search Another Tickets
                        </Link>
                    </div>

                    <div className="search-results__layout">
                        <aside className="search-results__sidebar">
                            <div className="search-results__filter">
                                <label htmlFor="priority" className="search-results__filter-label">Sort by:</label>
                                <select
                                    id="priority"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="search-results__filter-select"
                                    aria-label="Sort by"
                                >
                                    <option value="price">Recommended</option>
                                    <option value="duration">Duration</option>
                                </select>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={isFlexible}
                                        onChange={handleCheckboxChange}
                                        aria-label="Check if dates are flexible"
                                    />
                                    My dates are flexible
                                </label>
                            </div>
                        </aside>

                        <div className="search-results__content">
                            <FlightCard
                                departFlights={flight.departFlights}
                                returnFlights={flight.returnFlights}
                            />

                            <div className="search-results__summary">
                                <div className="search-results__price">
                                    <span>Total Fare:</span>
                                    <span className="search-results__amount">${offer ? Math.round(offer.price * 1.5) : 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
