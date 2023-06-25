// error catch by catch error
// const loadPhonesDAta = () => {
//   fetch("https://openapi.programming-hero.com/api/phones?search=iphone")
//     .then((res) => res.json())
//     .then((data) => console.log(data.data))
//     .catch((error) => console.log(error));
// };
// ------------------------------
const loadPhonesDAta = async (searchText, phoneLimit) => {
  const URL = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(URL);
  const data = await res.json();
  showPhones(data.data, phoneLimit);
};

const showPhones = (phones, phoneLimit) => {
  const phoneContainer = document.getElementById("phone_container");
  phoneContainer.innerHTML = "";
  // display only 8phone
  const showAllBtnSection = document.getElementById("showAllBtnSection");
  if (phoneLimit && phones.length > 8) {
    phones = phones.slice(0, 8);
    showAllBtnSection.classList.remove("d-none");
  } else {
    showAllBtnSection.classList.add("d-none");
  }
  // No Phone Found Message
  const noPhoneMessage = document.getElementById("no-found-message");
  if (phones.length === 0) {
    noPhoneMessage.classList.remove("d-none");
  } else {
    noPhoneMessage.classList.add("d-none");
  }

  // display All phone
  phones.forEach((phone) => {
    // random Price
    // function randomPrice() {
    //   const random = Math.round(Math.random() * 1000);
    //   return random;
    // }
    // const price = randomPrice();
    let price = Math.round(Math.random() * 1000);

    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div class="card h-100 p-4">
            <img src="${phone.image}" class="card-img-top " alt="...">
            <div class="card-body">
              <h2 class="card-title text-info">Brand :  <span class="text-secondary">${phone.brand}</span></h2>
              <h2 class="card-title text-success"> ${phone.phone_name}</h2>
              <h2 class="card-title text-danger">Price : $${price}.00</h2>
             <button onclick="showPhoneDetails('${phone.slug}')" class="btn btn-warning fw-bold fs-4" data-bs-toggle="modal" data-bs-target="#phoneDetails">Show Details</button>
            </div>
          </div>
    `;
    phoneContainer.appendChild(phoneDiv);
  });

  // stop  Spinner or loader
  showLoader(false);
};

const processSearch = (phoneLimit) => {
  // start spinner
  showLoader(true);
  const searchText = document.getElementById("search_field").value;
  loadPhonesDAta(searchText, phoneLimit);
};

// handle Search Button Click
document.getElementById("search_btn").addEventListener("click", function () {
  processSearch(8);
});
//  handle search enter key
document
  .getElementById("search_field")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      processSearch(8);
    }
  });

const showLoader = (loading) => {
  const loaderSection = document.getElementById("loading_show");
  // if (loading === "true")
  if (loading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};
document.getElementById("showMoreBtn").addEventListener("click", function () {
  processSearch();
});

const showPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = (phone) => {
  const phoneTitle = document.getElementById("phoneDetailsLabel");
  phoneTitle.innerText = phone.name;
  phoneTitle.classList.add("text-danger");
  const phoneDetails = document.getElementById("p_deatails");
  phoneDetails.innerHTML = `
  <h3 class="text-info">Storage :  <span class="text-success">${
    phone.mainFeatures.storage
  }</span></h3>
  <h3 class="text-info">Display : <span class="text-success">${
    phone.mainFeatures.displaySize
  }</span></h3>
  <h3 class="text-info">Sensors : <span class="text-success">${
    phone.mainFeatures.sensors
  } </span></h3>
  <h3 class="text-info">ReleaseDate : <span class="text-success">${
    phone.releaseDate ? phone.releaseDate : "Release Date Not Published"
  }</span></h3>
  `;
};
// auto call home page
loadPhonesDAta("samsung");
