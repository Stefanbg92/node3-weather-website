

const weathefForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

// msg1.textContent = 'From JS'

weathefForm.addEventListener('submit', (e) => {
    
    e.preventDefault()
    
    
    const location = search.value

    msg1.textContent = "Loading..."
    msg2.textContent = ''

    fetch('http://localhost:3000/weather?adress='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                msg1.textContent = data.error
            } else {
                msg1.textContent = data.location
                msg1.textContent = data.forecast
            }
        })
        })

    console.log(location)
})