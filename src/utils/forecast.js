const request = require('request')

const forecast = (longitude, latitude, callback) => {    
    const url = 'https://api.darksky.net/forecast/8c84620dda1b0b1fd4d7fd40321a43de/'+ latitude +','+ longitude +'?units=si'
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('unable to connect to service', undefined)
        } else if(body.error){
            callback('no results found try anouther search', undefined)
        } else {
            callback(undefined, 
                 body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degress out. There is " + body.currently.precipProbability + "% chance of rain"
             )
        }
    })
}

module.exports = forecast