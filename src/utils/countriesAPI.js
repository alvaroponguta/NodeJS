const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: 'https://restcountries.eu/rest/v2/',
    timeout: 1000
});

//Axios
const getCountryData = async country => {
    const { data } = await axiosInstance.get(`name/${country}`);
    return data[0];
}

module.exports = {
    getCountryData
}
