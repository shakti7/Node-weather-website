const request = require('request')

const geocode = (address, callback) =>{
    const url=`http://api.positionstack.com/v1/forward?access_key=d37a44a9115c1f902cb7c9eeac3c39b8&query=${encodeURIComponent(address)}&limit=1`

    request({url,json: true }, (error,{body}={})=>{
        // console.log(body.data)
        if(error){
            callback('Unable to connect to location services!',undefined)
        }else if(body.error || body.data.length === 0){
            callback('Unable to find the location... Try again with different search',undefined)
        }else{
            callback(undefined,{
                Latitude: body.data[0].latitude,
                Longitude: body.data[0].longitude,
                Location: body.data[0].label
            })
        }
    })
}

module.exports = geocode