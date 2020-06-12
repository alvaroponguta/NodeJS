const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { getCountryData } = require('./utils/countriesAPI');

const app = express();
const app_port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Countries App'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Anything you want please contact help@nodejs.com'
    });
});

app.get('/country', async (req, res) => {
    const {countryName} = req.query;

    if (!countryName) {
        res.send({
            error: 'You must provide the name of a country'
        })
    }

    try {
        const countryData = await getCountryData(countryName);

        res.send({
            countryData
        });
    } catch {
        res.render('404', {
            title: '400',
            errorMessage: 'An error ocurred, please try again'
        });
    }
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found'
    });
});

app.listen(app_port, () => {
    console.log(`Server is up in port ${app_port}.`);
});
