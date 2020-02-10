const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Stefan"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: "Stefan"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help page",
        name: "Stefan"
    })
})

app.get('/products', (req, res)=> {
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
   if(!req.query.adress) {
       return res.send({
           error: 'You must provide search adress'
       })
   }

   geocode(req.query.adress, (error, {longitude, latitude, location} = {}) => {
    if (error) {
        return res.send({error})
    }

    forecast(longitude, latitude, (error, forecastData) => {
        if(error) {
            return res.send({error})
        }
        res.send({
            forecast: forecastData,
            location,
            adress: req.query.adress
        })
    })
   })
})


app.get('/help/*', (req, res) => {
    res.render ('404',{
        title: '404',
        name: 'Stefan',
        errorMessage: 'Help article not found'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Stefan',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})