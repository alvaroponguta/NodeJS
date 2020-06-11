const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: 'https://restcountries.eu/rest/v2/',
    timeout: 1000
});

const getCountryData = (country, callback) => {
    axiosInstance.get(`name/${country}`)
        .then(response => {
            callback(response.data[0]);
        })
        .catch(error => {
            console.error(`Hubo un error ${error.response.status}, por favor revise sus parametros y vuelva a intentarlo`);
        });
}

module.exports = {
    getCountryData
}
