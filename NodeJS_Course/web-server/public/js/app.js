const countryForm = document.querySelector('form');
const search = document.querySelector('input');
const countryTitle = document.querySelector('#countryID');
const capitalHTML = document.querySelector('#capitalID');

countryForm.addEventListener('submit', e => {
    const countryName = search.value;

    e.preventDefault();

    fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
        .then(response => {
            response.json().then(data => {
                if(data.status !== 404) {
                    const {name, capital} = data[0];

                    countryTitle.textContent = name;
                    capitalHTML.textContent = `Capital: ${capital}`;
                } else {
                    capitalHTML.textContent = `Country ${data.message}`;
                }
            })
        });
});
