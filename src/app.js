const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const Forecast = require('./utils/forecast')
const request = require('request')
const forecast = require('./utils/forecast')
const cors = require('cors')
require('dotenv').config();

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))


const app = express()
const port = process.env.PORT || 3000;

app.use(cors());

//Defines path for express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath) // where the partials live

//app.com
//app.com/help
//app.com/about

//Setup static directory to serve
app.use(express.static(publicDirectory))

// app.get('',(req, res)=>{
//     res.send('<h1>Weather</h1>')
// })
app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather ',
        name: 'Shakti Prasanna Sahoo'
    })
})

// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'Shakti'
//     },{
//         name: 'Sarrah'
//     }])
// })


// app.get('/about',(req,res)=>{
//     res.send('<h1>About Page</h1>')
// })

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name:'Shakti Prasanna Sahoo'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Shakti Prasanna Sahoo'
    })
})

app.get('/weather',(req,res)=>{
    // res.send({
    //     Forecast:'50 degrees',
    //     Location: 'Bhubaneswar'
    // })
    if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    }
    // console.log(req.query.address)

    geocode(req.query.address,(error,{Latitude,Longitude,Location}={})=>{
        if(error){
            return res.send({error})
        } 

        forecast(Longitude,Latitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                    forecast: forecastData,
                    Location,
                    address: req.query.address
                })
            })
        })
    

    // res.send({
    //     Forecast:'50 degrees',
    //     Location: 'Bhubaneswar',
    //     address: req.query.address
    // })
})

app.get('/product',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Shakti Prasanna Sahoo'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        errorMessage: 'Page not found',
        name: 'Shakti Prasanna Sahoo'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
})