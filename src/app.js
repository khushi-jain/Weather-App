const path=require('path')  //core node module
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000

//define paths for express config
const publicdir= path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views') 
const partialsPath=path.join(__dirname,'../templates/partials')

//takes it to the path called join to set up static directory
app.use(express.static(publicdir))

//setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)



app.get('',(req,res)=>{
    res.render('index',{
        title: 'weather app',
        name: 'me'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'khushi jain'
    })
})

     app.get('/help',(req,res)=>{
     res.render('help',{
          helpText: 'it is snowing',
          title: 'help',
          name: 'khushi jain'
     })
 })


app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'error challenge'
        })
    }

        geocode(req.query.address,(error,{latitude='lat not provided',longitude='long not provided',location}={})=>{
            
if(error){
return res.send({
    error: 'error'
})  
}

        forecast( latitude,longitude, (error, forecastdata) => {

            if(error){
                res.send({
                    error: 'error'
                })     
            }
            
                 res.send({
                      forecastdata: forecastdata,
                      location,
                      addresss: req.query.address
                      })
            
            })  
        })   
}) //wiring up the endpoint

app.get('/products',(req,res)=>{
    if(!req.query.search){
return res.send({
    error:'you must provide a search term'
})
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})


 app.get('/help/*',(req,res)=>{
     res.render('404',{
         title: '404',
         name:'khushi',
     errorMessage: 'Help article not found'})
   })

// app.get('/about/*',(req,res)=>{
//     res.render('help article not found')
//    })

//wildcard comp *
app.get('*',(req,res)=>{
 res.render('404',{
     title:'444',
     name:'and',
     errorMessage:'Page not found'
 })
})

app.listen(port,()=>{
    console.log('Server is up!! on port'+port)
}) 
