const axios = require('axios');
const yargs = require('yargs');

const axiosInstance = axios.create({
    baseURL: 'https://restcountries.eu/rest/v2/',
    timeout: 1000
});

yargs.command({
    command: 'capital',
    describe: 'Get the capital of an specific country',
    builder: {
        countryName: {
            describe: 'Name of the country',
            demandOption: true,
            type: 'string'
        }
    },
    handler: country => getCapital(country.countryName)
});

const getCapital = country => {
    axiosInstance.get(`name/${country}`)
        .then(response => {
            const { capital } = response.data[0];

            console.log(`La capital de ${country} es ${capital}`);
        })
        .catch(error => {
            console.error(`Hubo un error ${error.response.status}, por favor revise sus parametros y vuelva a intentarlo`);
        });
}

yargs.parse();
