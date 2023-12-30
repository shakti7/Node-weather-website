const request = require('request')

const forecast = (longitude,latitude,callback) =>{
    const url= `http://api.weatherstack.com/current?access_key=36993430068be416660182b3594eb350&query=${latitude},${longitude}`
    
    request({ url,json: true},(error,{body}={})=>{
        const{error:forecastError, current}=body
        const{weather_descriptions,temperature,feelslike}=current
        // console.log(body)
        if(error){
            callback('Unable to connect to Weather services!',undefined)
        }else if(forecastError){
            //when change coordinates to string then you get an error in response not the error in the argument
            callback('Unable to find location',undefined)
        }else{
            // console.log(response.body.current)
            callback(undefined,`${weather_descriptions[0]}- weather type. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`)
            // callback(undefined,`${body.current}`)
        }
    })
}

module.exports = forecast