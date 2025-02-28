let data = [];
let card =document.getElementById("Cardcontainer");


async function Cryptoboard(){
try{
  const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false")
   
   const data = await res.json();
   console.log("data is fetching", data[0])

   for(let i = 0; i < data.length; i++ ){
         card.innerHTML += `<div class="card">
           <div class="image">
        <img class="img" src = ${data[i].image}>
        </div>
        
        <div class="details">
        <div class = "tit">
            <span class="name">${data[i].name}</span>
            <span class="price">${data[i].current_price}</span>
        </div>
        </div>
        <div class = "tit">
            <span class="short name">${data[i].symbol}</span>
            <span class="percent">${data[i].market_cap_change_percentage_24h}</span>
        </div>
        </div>`
 
   }
}
catch(err){
    console.log("error",err);
}

}

Cryptoboard()



