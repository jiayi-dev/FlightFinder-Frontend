import { format } from 'date-fns';
import airports from '../data/airports.json';
import airlines from '../data/airline.json';

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date)
        ? format(date, 'MMM dd, yyyy')
        : 'Invalid date';
};

export const formatDuration = (duration) => {
    if (!duration) return 'Duration not available';

    const regex = /PT(\d+)H(\d+)M/;
    const matches = duration.match(regex);
    if (matches) {
        const hours = parseInt(matches[1], 10);
        const minutes = parseInt(matches[2], 10);
        return `${hours}h ${minutes}m`;
    }
    return 'Invalid duration';
};

export const airportMap = Object.values(airports).reduce((acc, airport) => {
    acc[airport.iata_code] = airport.name;
    return acc;
}, {});

export const airlineMap = airlines.reduce((acc, airline) => {
    acc[airline.iata_code] = airline.name;
    return acc;
}, {});
