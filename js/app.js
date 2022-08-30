const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json();
    displayPhones(data.data, dataLimit)
}


const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ''
    //Display only 10
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    //Display No Phone Found: 
    const noPhone = document.getElementById('no-phone-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none')
    }
    //Display All Phone 
    phones.forEach(phone => {
        const { brand, phone_name, slug, image } = phone;
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-5">
        <img src=${image} class="card-img-top " alt="...">
        <div class="card-body">
          <h5 class="card-title">Name:  ${phone_name}</h5>
          <p class="card-text">Brand: ${brand}</p>
          <p class="card-text">${slug}</p>
          <button onclick=loadPhoneDetails('${slug}') class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal" >Show Details</button>
        </div>
      </div>
        `
        phoneContainer.appendChild(phoneDiv)
    })
    //stop Spinier Loader 
    toggleSpinner(false)
}
/**Common Function  */
const processSearch = (dataLimit) => {
    toggleSpinner(true)
    const searchFieldText = document.getElementById('search-field')
    const searchText = searchFieldText.value;
    loadPhones(searchText, dataLimit);
    console.log(dataLimit)
    searchFieldText.value = '';
}


//Handle Search Button Clicked 
document.getElementById('btn-search').addEventListener('click', function () {
    //start loader
    processSearch(10)
})
//Using enter to search 
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      // code for enter
      processSearch(10)
    }
});



const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

/**NOT THE BEST WAY TO SHOW ALL  */
document.getElementById('button-showAll').addEventListener('click', function () {
    processSearch();
    console.log(processSearch())
})

const loadPhoneDetails =async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`; 
    const res = await fetch(url); 
    const data = await res.json(); 
    displayPhoneDetails(data.data)
}

//Modal BOdy : 
const displayPhoneDetails = phone => {
    console.log(phone)

    const modalTitle = document.getElementById('phoneDetailsModalLabel'); 
    modalTitle.innerText = phone.name; 
    const phoneDetails = document.getElementById('modalBody'); 
    phoneDetails.innerHTML = `
        <p>${phone.releaseDate ? phone.releaseDate: "NO RELEASE DATE FOUND"} </p>
        <p>Storage : ${phone.mainFeatures.storage}  </p>
        <p>Display: ${phone.mainFeatures.displaySize}  </p>
        <p>Others: ${phone.others ? phone.others.WLAN : "no Info Found " }  </p>
        
    `
}


loadPhones('iphone'); 