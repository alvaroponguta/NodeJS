const request = require('request');

const country = 'Colombia';
const url = `https://restcountries.eu/rest/v2/name/${country}`;

request({ url, json: true }, (error, response) => {
    if (error) {
        console.log('No se puedo establecer una conexion con restcountries');
    } else if (!response.body) {
        console.log('Hubo un error, revise sus parametros y vuelva a intentar');
    } else {
        const countryData = response.body[0];
        console.log(`La capital de ${country} es ${countryData.capital}`);
    }
});