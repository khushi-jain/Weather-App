// const geo='https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoia2h1c2hpMTEyNSIsImEiOiJjbDA3dGp3NXQwcWtlM2tyMnJlZmNkd3EzIn0.Gftrr1BXW_Uw482ClmtlZA&limit=1'
// request({url:geo,json:true},(error,response)=>{
     
// if(error){
// console.log('error')
// }
// else if(response.body.features.length===0){
// console.log('invalid input')
// }
// else{

//     const lat=response.body.features[0].center[1]
//     const long=response.body.features[0].center[0]

//     console.log(lat,long)

// }

//  })

const request=require('request')

const geocode=(address,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2h1c2hpMTEyNSIsImEiOiJjbDA3dGp3NXQwcWtlM2tyMnJlZmNkd3EzIn0.Gftrr1BXW_Uw482ClmtlZA&limit=1'
    request({url:url,json:true},(error,{body,features,center}={})=>{
if(error){
         callback('unable to connect to loc services',undefined)

}
else if(body.features.length===0){
callback('unable to find loc. try another service'+undefined)
}
else{
    callback(undefined,{
         latitude: body.features[0].center[1],
         longitude:body.features[0].center[0],
         location: body.features[0].place_name
    })
}

    })

}

module.exports=geocode



