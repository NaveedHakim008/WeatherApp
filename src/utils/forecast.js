const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const   URL='http://api.weatherstack.com/current?access_key=7551af6967545bd87984d5c2c793156f&query='+latitude+','+longitude+''
    request({url:URL,json:true},(error,response)=>{
        if(error)
        {
            callback('unable to connect to weather forecast services',undefined)
        }
        else if(response.body.success===false)
        {
            callback('unable to find weather forecast.Try another search',undefined)
        }
        else
        {
            const {weather_descriptions:description,temperature}=response.body.current
            callback('',{
                description:description[0],
                temperature
            })
        }

    })

}
module.exports=forecast
