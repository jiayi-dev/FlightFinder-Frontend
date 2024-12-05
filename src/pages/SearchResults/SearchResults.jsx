import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';
import FlightList from '../../components/FlightList/FlightList';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import FlightMatrix from "../../components/FlightMatrix/FlightMatrix.jsx";
import TextSpinnerLoader from '../../components/TextSpinner/TextSpinner';
import { fetchSingleOffer, fetchMatrixOffer } from '../../services/flightApi';
import { formatDate } from '../../utils/dateUtils';
import './SearchResults.scss';

const SearchResults = () => {
    const { state } = useLocation();
    const { searchData } = state || {};

    const [flights, setFlights] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [priority, setPriority] = useState('price');
    const [isFlexible, setIsFlexible] = useState(false);

    useEffect(() => {
        const fetchFlights = async () => {
            if (!searchData) return;

            setIsLoading(true);
            setError(null);

            try {
                const updatedSearchData = {
                    ...searchData,
                    departDate: searchData?.departDate
                        ? new Date(searchData.departDate).toISOString().slice(0, 10)
                        : '',
                    returnDate: searchData?.returnDate
                        ? new Date(searchData.returnDate).toISOString().slice(0, 10)
                        : '',
                    priceOrDuration: priority,
                };

                const data = isFlexible
                    ? await fetchMatrixOffer(updatedSearchData)
                    : await fetchSingleOffer(updatedSearchData);

                setFlights(data);

            } catch (err) {
                console.error('Error fetching flights:', err);
                setError('Failed to fetch flight offers. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchFlights();
    }, [searchData, isFlexible, priority]);

    const renderFlightResults = () => {
        if (isLoading) {
            return (
                <div className="search-results__loading">
                    <TextSpinnerLoader />
                </div>
            );
        }

        if (error) {
            return <div className="search-results__error">{error}</div>;
        }

        if (!flights) {
            return <div className="search-results__empty">No flights available</div>;
        }

        return isFlexible && Array.isArray(flights) && Array.isArray(flights[0])
            ? <FlightMatrix flights={flights} />
            : <FlightList flights={flights} />;
    };

    if (!searchData) {
        return (
            <div className="search-results__error">
                <p>No search data available.</p>
                <Link to="/" className="search-results__button">Return to Search</Link>
            </div>
        );
    }

    return (
        <div className="search-results__main">
            <div className="search-results__header">
                <div className="search-results__route">
                    <span className="search-results__route-origin">{searchData.origin}</span>
                    <span className="search-results__separator">-</span>
                    <span className="search-results__route-destination">{searchData.destination}</span>
                </div>

                <div className="search-results__details">
                    <div className="search-results__detail">
                        <FaUser />
                        <span>{searchData?.travelers?.adults || 1} passenger | Economy</span>
                    </div>
                    <div className="search-results__detail">
                        <FaCalendarAlt className="search-results__icon" />
                        <span>
              {formatDate(searchData.departDate)} - {formatDate(searchData.returnDate)}
            </span>
                    </div>
                </div>

                <Link to="/" className="search-results__search-button">
                    New Search
                </Link>
            </div>

            <div className="search-results__layout">
                <aside className="search-results__sidebar">
                    <SearchFilters
                        priority={priority}
                        setPriority={setPriority}
                        isFlexible={isFlexible}
                        setIsFlexible={setIsFlexible}
                    />
                </aside>
                <div className="search-results__content">
                    <div className="search-results__layout">
                    </div>

                    <main className="search-results__main">
                        {renderFlightResults()}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;

