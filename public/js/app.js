const countryForm = document.querySelector('form');
const search = document.querySelector('input');
const countryTitle = document.querySelector('#countryID');
const capitalHTML = document.querySelector('#capitalID');

countryForm.addEventListener('submit', async e => {
    const countryName = search.value;

    e.preventDefault();

    const response = await fetch(`/country?countryName=${countryName}`);
    const data = await response.json().catch( _ => {
        countryTitle.textContent = '';
        capitalHTML.textContent = 'Country not found, please try again'
    });

    if (data) {
        const {name, capital} = data.countryData;

        countryTitle.textContent = name;
        capitalHTML.textContent = `Capital: ${capital}`;
    }
});
