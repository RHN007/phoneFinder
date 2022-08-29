const loadPhones = async () =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=iphone`
    const res = await fetch(url)
    const data = await res.json(); 
   displayPhones(data.data)
}


const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container'); 

    phones.forEach(phone=> {
        const {brand, phone_name , slug, image} = phone
        const phoneDiv = document.createElement('div'); 
        phoneDiv.classList.add('col'); 
        phoneDiv.innerHTML = `
        <div class="card">
        <img src=${image} class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Name:  ${phone_name}</h5>
          <p class="card-text">Brand: ${brand}</p>
          <p class="card-text">${slug}</p>
        </div>
      </div>
        `
        phoneContainer.appendChild(phoneDiv)
    })

}

loadPhones()