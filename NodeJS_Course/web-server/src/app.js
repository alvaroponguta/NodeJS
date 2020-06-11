const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { getCountryData } = require('./utils/countriesAPI');

const app = express();
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

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found'
    });
});

app.get('/country', (req, res) => {
    if (!req.query.countryName) {
        res.send({
            error: 'You must provide the name of a country'
        })
    }

    getCountryData(req.query.countryName, countryData => {
        res.send({
            countryName: req.query.countryName,
            countryData
        });
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server is up in port 3000.');
});