const loadPhones = async (searchText) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json(); 
   displayPhones(data.data)
}


const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container'); 
    phoneContainer.innerHTML = ''

    //Display only 10
    phones = phones.slice(0,10)
    //Display No Phone Found: 

    const noPhone = document.getElementById('no-phone-message'); 
    if(phones.length === 0){
        noPhone.classList.remove('d-none'); 
    }
    else {
        noPhone.classList.add('d-none')
    }
    //Display All Phone 
    phones.forEach(phone=> {
        const {brand, phone_name , slug, image} = phone;
        const phoneDiv = document.createElement('div'); 
        phoneDiv.classList.add('col'); 
        phoneDiv.innerHTML = `
        <div class="card p-5">
        <img src=${image} class="card-img-top " alt="...">
        <div class="card-body">
          <h5 class="card-title">Name:  ${phone_name}</h5>
          <p class="card-text">Brand: ${brand}</p>
          <p class="card-text">${slug}</p>
        </div>
      </div>
        `
        phoneContainer.appendChild(phoneDiv)
    })
    //stop Spinier Loader 
        toggleSpinner(false)
}
//Handle Search Button Clicked 
document.getElementById('btn-search').addEventListener('click', function(){
    //start loader
    toggleSpinner(true)
    const searchFieldText = document.getElementById('search-field')
    const searchValue = searchFieldText.value; 
    loadPhones(searchValue); 
    searchFieldText.value = ''; 
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader'); 
    if(isLoading){
        loaderSection.classList.remove('d-none'); 
    }
    else {
        loaderSection.classList.add('d-none')
    }
}
// loadPhones()