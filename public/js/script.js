const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const searchResult=document.getElementById('search_result')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log(searchResult)
    console.log(search)
    fetch('http://localhost:3001/weather?'+'address='+search.value).then((response)=>{
      response.json().then((data)=>{
        if(data.error)
        {
            console.log(data.error)
          searchResult.innerHTML=data.error
        }
        else
        {
            const innerHTML='<b>Forecast:</b>'+data.forecast+'<br><b>location:</b>'+data.location+'<br>'
            searchResult.innerHTML=innerHTML

        }
      })
    })
})
