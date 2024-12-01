import React, { useState, useEffect, useRef } from 'react';
import { Plane } from 'lucide-react';
import airportsData from '../../data/airports.json';
import './AirportSearch.scss';

export default function AirportSearch({ label, value, onChange, placeholder }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAirports, setFilteredAirports] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const wrapperRef = useRef(null);
    const debounceTimeout = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (searchTerm) {
            setIsLoading(true);
            clearTimeout(debounceTimeout.current);

            debounceTimeout.current = setTimeout(() => {
                const searchTermLower = searchTerm.toLowerCase();
                const filtered = airportsData.filter(
                    (airport) =>
                        airport.name.toLowerCase().includes(searchTermLower) ||
                        airport.iata_code.toLowerCase().includes(searchTermLower)
                );
                setFilteredAirports(filtered);
                setIsOpen(true);
                setIsLoading(false);
            }, 300);
        } else {
            setFilteredAirports([]);
            setIsOpen(false);
        }
    }, [searchTerm]);

    const handleSelect = (airport) => {
        onChange(airport.iata_code);
        setSearchTerm('');
        setIsOpen(false);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        onChange(value);
        setSearchTerm(value);
    };

    const selectedAirport = airportsData.find((airport) => airport.iata_code === value);

    return (
        <div className="airport-select" ref={wrapperRef}>
            <div
                className="airport-select__field"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="airport-select__content">
                    <Plane className="airport-select__icon" />
                    <div>
                        <p className="airport-select__label">{label}</p>
                        <p className="airport-select__value">
                            {selectedAirport
                                ? `${selectedAirport.name} (${selectedAirport.iata_code})`
                                : 'Select airport'}
                        </p>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="airport-select__dropdown">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder={placeholder || 'Search airports...'}
                        className="airport-select__search"
                    />
                    {isLoading && <div className="airport-select__loading">Loading...</div>}
                    <div className="airport-select__list">
                        {filteredAirports.length > 0 ? (
                            filteredAirports.map((airport, index) => (
                                <div
                                    key={`${airport.iata_code}-${index}`}
                                    className="airport-select__item"
                                    onClick={() => handleSelect(airport)}
                                >
                                    <div className="airport-select__item-city">{airport.name} ({airport.iata_code})</div>
                                    <div className="airport-select__item-details">
                                        {airport.iata_code}, {airport.country_code}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="airport-select__no-results">No results found</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
