

console.log('client side js is loaded')





const weatherForm = document.querySelector('form')
const search=document.querySelector('input')

const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

messageOne.textContent='Loading...'
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                // console.log(data.error)
                messageTwo.textContent=data.error
            }else{
                messageOne.textContent=data.forecast
                messageTwo.textContent=data.data
            }
        })
    })
    console.log(location)
    
}) 


