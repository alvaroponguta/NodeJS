const countryForm = document.querySelector('form');
const search = document.querySelector('input');
const countryTitle = document.querySelector('#countryID');
const capitalHTML = document.querySelector('#capitalID');

countryForm.addEventListener('submit', e => {
    const countryName = search.value;

    e.preventDefault();

    fetch(`/country?countryName=${countryName}`)
        .then(response => {
            response.json().then(data => {
                if(data.status === 404) {
                    capitalHTML.textContent = `Country ${data.message}`;
                } else {
                    const {name, capital} = data.countryData;

                    countryTitle.textContent = name;
                    capitalHTML.textContent = `Capital: ${capital}`;
                }
            })
        });
});
