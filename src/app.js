const path=require('path')
const express=require('express')
const hbs=require('hbs')
const forecast=require('./utils/forecast')

const app=express()
const publicDirectory=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Manoj'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Manoj'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text.',
        title:'Help', 
        name:'Manoj'
    }) 
})

// app.get('/weather',(req,res)=>{
//     res.send([{
//         Location:'Hyderabad',
//         Temperature:26
//     }])
// })

app.get('/weather',(req,res)=>{
    const address=req.query.address
    if(!address){
        return res.send({
            error:'You must provide an address'
        })
    }
    console.log(address)
    forecast(address,(error,data)=>{
        if(error){ 
            return res.send({
                error:'Provide a valid address'
            })
        }
        console.log(data)
        res.send({
            forecast:'Its snowing',
            address:address,
            data:data
        })
    })

    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
    products:[]
    })
    
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Manoj',
        errorMessage:'Page not found'
    }) 
})
app.listen(3000,()=>{
    console.log('server started at 3000')
})