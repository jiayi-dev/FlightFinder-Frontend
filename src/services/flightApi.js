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


