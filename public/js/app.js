console.log('Client side javascript file is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//         // console.log(data.puzzle)
//     })
// })

// fetch('http://localhost:3000/weather?address=Gandhinagar').then((response)=>{
//     response.json().then((data)=>{
//         // console.log(data)
//         if(data.error){
//             return console.log(data.error)
//         }
//         console.log(data.Location)
//         console.log(data.forecast)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//To manipulate the text
// messageOne.textContent = 'From Javascript'


weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();

    //search.value is used to access the current value of the input field
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            // return console.log(data.error)
            messageOne.textContent = data.error
        }else{
            // console.log(data.Location)
            // console.log(data.forecast)
            messageOne.textContent = data.Location
            messageTwo.textContent = data.forecast
        }
        })
    })

    // console.log(location)

    // console.log('testing!')
})