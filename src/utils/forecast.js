//   const url='http://api.weatherstack.com/current?access_key=12c295a07fbeab765ccb0076fdbf796e&query=37.8267,-122.4233&units=f'
//  request({url: url,json: true}, (error,response)=>{

// if(error){
//     console.log('error')}
   
//    else if(response.body.error){
// console.log('unable to find')
//    }
   
//     else{
//         console.log(response.body.current.weather_descriptions[0]+' it is currently '+response.body.current.temperature+' but feels like '+response.body.current.feelslike)
//     }



      // console.log(response)
      // const data=JSON.parse(response.body)
      // console.log(data.current)
      // console.log(response.body.current)
       
       //  })
const request=require('request')

const forecast=(latitude,longitude,callback)=>{
const url='http://api.weatherstack.com/current?access_key=12c295a07fbeab765ccb0076fdbf796e&query='+latitude+','+longitude+'&units=f'
request({url:url,json:true},(error,{body,weather_descriptions,current,temperature,feelslike}={})=>{
if(error){
    callback('not found',undefined)
}
else if(body.error){
callback('error',undefined)
}
else{
callback(undefined,body.current.weather_descriptions[0]+' it is currently '+body.current.temperature+' but feels like '+body.current.feelslike+'since the humidity is'+body.current.humidity+'%')
}
})

}

module.exports=forecast