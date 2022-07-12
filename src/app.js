const express=require('express')
const path=require('path')
const app=express()
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')
const hbs=require('hbs')
//console.log()
//define paths for express
const publicDirectory=path.join(__dirname,'../','public')
//partial path
const partialDirectory=path.join(__dirname,'../','templates/partials')
hbs.registerPartials(partialDirectory)
const viewsPath=path.join(__dirname,'../','templates/views')
//set up static directory to serve
app.use(express.static(publicDirectory))
//set up handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
app.get('/help',(req,res)=>{
    res.render('help',{helptext:'This text is helpful',title:'Help'})
})
app.get('/',(req,res)=>{
    res.render('index',{title:'Weather App'})})
app.get('/about',(req,res)=>{
    res.render('about',{title:'About',name:'Naveed Hakim'})
})
app.get('/help/*',(req,res)=>{
    res.render('help_404',{text:'help article not found'})
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return (res.send({error:`Can't get the weather address not found`}))
    }
    else {
        geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
            if (!error) {
                forecast(latitude, longitude, (error, {description,temperature}) => {
                    if (!error) {
                        res.send(
                            {
                                forecast: description + '' + temperature,
                                location,
                                address: req.query.address,

                            }
                        )
                    } else {
                        res.send({
                            error: error

                        })
                    }

                })
            } else {
                res.send({
                    error: error
                })
            }
        })


    }

})
app.get('*',(req,res)=>{
    res.render('404')
})

 app.listen(3001,()=> {

     console.log('server is running')
 })