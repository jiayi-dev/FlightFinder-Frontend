import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchSingleOffer = async (searchData) => {
    const response = await axios.post(`${apiBaseUrl}/offer/one`, searchData);
    return response.data.data;
};

export const fetchMatrixOffer = async (searchData) => {
    const response = await axios.post(`${apiBaseUrl}/offer/matrix`, {
        origin: searchData?.origin,
        destination: searchData?.destination,
        departDate: searchData?.departDate,
        returnDate: searchData?.returnDate,
        numberOfAdults: searchData?.travelers?.adults || 1,
    });
    return response.data.data;
};

export const fetchSegment = async (flight) => {
    if (flight) {
        const departSegments = flight.departFlightSegments?.split('-') || [];
        const returnSegments = flight.returnFlightSegments?.split('-') || [];

        if (departSegments.length === 0 && returnSegments.length === 0) {
            return ({ departFlights: [], returnFlights: [] });
        }

        const departFlightRequests = departSegments.map(flightNumber =>
            axios.get(`${apiBaseUrl}/flight/flightnumber/${flightNumber}`)
        );

        const returnFlightRequests = returnSegments.map(flightNumber =>
            axios.get(`${apiBaseUrl}/flight/flightnumber/${flightNumber}`)
        );

        try {
            const [departResponses, returnResponses] = await Promise.all([
                Promise.all(departFlightRequests),
                Promise.all(returnFlightRequests)
            ]);

            const departFlights = departResponses.map(response => response.data.data);
            const returnFlights = returnResponses.map(response => response.data.data);

            return ({
                departFlights,
                returnFlights
            });

        } catch (error) {
            console.error("Error fetching flight data:", error);
        }
    } else {
        throw new Error("Offer data is null or undefined");
    }
}

