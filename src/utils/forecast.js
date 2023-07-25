const request= require('postman-request')

const forecast=(address,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=664b31b9b26a1ce4cb09d3a86b6da282&query='+encodeURIComponent(address)

    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,'the current temperature of '+address+' is '+body.current.temperature)
        }
    })
}
module.exports=forecast