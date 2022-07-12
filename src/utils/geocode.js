const request=require('request')
const geocode=(address,callback)=> {
    const geolocation = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibmgyMDAyIiwiYSI6ImNsNTlnN21tdjJjZmEzZXBwcmM2enN5dXAifQ.2c2ONW6x3iGN_ecfcNeXpw'
    request({url: geolocation, json: true}, (error, response) => {
        if (error) {
            callback("unable to connect to location services", undefined)
        } else if (response.body.features.length === 0) {
            callback('unable to find location . Try' +
                ' another location.', undefined)
        }
        else
        {
            const {center,place_name}=response.body.features[0]
            callback('',{
                latitude:center[1],
                longitude:center[0],
                location:place_name
            })

        }

    })
}


module.exports=geocode