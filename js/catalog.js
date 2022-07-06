// Api
const url = "https://e-carros-api.herokuapp.com/";
const api = axios.create({ baseURL: url });

// Loader
const loader = "<span>Carregando...</span>";

window.onload = () => {
  generateFormFields();
  updateCarsGrid();
};

// --------------- GENERATE FORM FIELDS - START ---------------- //

// Get elements
const formCondition = document.querySelector("#formCondition");
const formLocale = document.querySelector("#formLocale");
const formType = document.querySelector("#formType");
const formBrand = document.querySelector("#formBrand");
const formFuel = document.querySelector("#formFuel");
const formTransmission = document.querySelector("#formTransmission");
const formMileage = document.querySelector("#formMileage");
const formColor = document.querySelector("#formColor");
const formAdditional = document.querySelector("#formAdditional");

// Update all form fields
async function generateFormFields() {
  await generateFormRadioCondition();
  await generateFormSelectLocale();
  await generateFormCheckType();
  await generateFormSelectBrand();
  await generateFormCheckFuel();
  await generateFormCheckTransmission();
  await generateFormSelectMileage();
  await generateFormCheckColor();
  await generateFormCheckAdditional();
}

// Condition
async function generateFormRadioCondition() {
  // Loading
  formCondition.innerHTML = loader;

  // Get data
  const carConditions = await getCarConditions();
  console.log("carConditions", carConditions);

  // Add child elements
  formCondition.innerHTML = `${carConditions
    .map((element, index) => {
      let id = `formCondition${normalizeStringToId(element.label)}`;
      let on_change = `updateQueryParams(this, 'condition' ,'${element.id}')`;
      let is_checked =
        location.search.indexOf(
          `condition=${encodeURI(element.id).replaceAll("%20", "+")}`
        ) > -1
          ? "checked"
          : "";

      return `
        <div>
          <input
              type="radio"
              name="form${name}"
              id="${id}"
              value="${element.id}"
              onChange="${on_change}"
              ${is_checked}
          />
          <label for="${id}" key="${index}">${element.label}</label>
        </div>
      `;
    })
    .join("")}`;

  // If there is no radio checked, select the first one
  // if (location.search.indexOf("condition=") === -1) {
  //   document.querySelector("input[name='formCondition']").checked = true;
  // }
}
async function getCarConditions() {
  const { data } = await api.get(`/condition`);
  return data;
}
async function getCarCondition(id) {
  const { data } = await api.get(`/condition?id=${id}`);
  return data[0];
}

// Locale
async function generateFormSelectLocale() {
  // Loading
  formLocale.innerHTML = loader;

  // Get data
  const carLocales = await getCarLocales();
  console.log("carLocales", carLocales);

  // Add child elements
  formLocale.innerHTML = `
    <option value="" key="0">Escolha o local</option>
    ${carLocales
      .map((element, index) => {
        return generateSelect("Location", element.value, element.id, index);
      })
      .join("")}`;

  // Add event on change
  formLocale.addEventListener("change", () =>
    updateQueryParams(formLocale, "location")
  );
}
async function getCarLocales() {
  const { data } = await api.get(`/locale`);
  return data;
}
async function getCarLocale(id) {
  const { data } = await api.get(`/locale?id=${id}`);
  return data[0];
}

// Type
async function generateFormCheckType() {
  // Loading
  formType.innerHTML = loader;

  // Get data
  const carTypes = await getCarTypes();
  console.log("carTypes", carTypes);

  // Add child elements
  formType.innerHTML = `${carTypes
    .map((element, index) => {
      return generateCheckbox("Cartype", element.value, element.value, index);
    })
    .join("")}`;
}
async function getCarTypes() {
  const { data } = await api.get(`/cartype`);
  return data;
}

// Brand
async function generateFormSelectBrand() {
  // Loading
  formBrand.innerHTML = loader;

  // Get data
  const carBrands = await getCarBrands();
  console.log("carBrands", carBrands);

  // Add child elements
  formBrand.innerHTML = `
    <option value="" key="0">Marca</option>
    ${carBrands
      .map((element, index) => {
        return generateSelect("Brand", element.name, element.id, index);
      })
      .join("")}`;

  // Add event on change
  formBrand.addEventListener("change", () =>
    updateQueryParams(formBrand, "brand")
  );
}
async function getCarBrands() {
  const { data } = await api.get(`/brands`);
  return data;
}

// Fuel
async function generateFormCheckFuel() {
  // Loading
  formFuel.innerHTML = loader;

  // Get data
  const carFuels = await getCarFuels();
  console.log("carFuels", carFuels);

  // Add child elements
  formFuel.innerHTML = `${carFuels
    .map((element, index) => {
      return generateCheckbox("Fuel", element.label, element.id, index);
    })
    .join("")}`;
}
async function getCarFuels() {
  const { data } = await api.get(`/fuel`);
  return data;
}

// Transmission
async function generateFormCheckTransmission() {
  // Loading
  formTransmission.innerHTML = loader;

  // Get data
  const carTransmissions = await getCarTransmissions();
  console.log("carTransmissions", carTransmissions);

  // Add child elements
  formTransmission.innerHTML = `${carTransmissions
    .map((element, index) => {
      return generateCheckbox("Transmission", element.value, element.id, index);
    })
    .join("")}`;
}
async function getCarTransmissions() {
  const { data } = await api.get(`/transmission`);
  return data;
}

// Mileage
async function generateFormSelectMileage() {
  // Loading
  formMileage.innerHTML = loader;

  // Get data
  const carMileages = await getCarMileages();
  console.log("carMileages", carMileages);

  // Add child elements
  formMileage.innerHTML = `
    <option value="" key="0">Todas</option>
    ${carMileages
      .map((element, index) => {
        return generateSelect("Mileage", element.value, element.value, index);
      })
      .join("")}`;

  // Add event on change
  formMileage.addEventListener("change", () =>
    updateQueryParams(formMileage, "mileage")
  );
}
async function getCarMileages() {
  const { data } = await api.get(`/mileage`);
  return data;
}

// Car colors
async function generateFormCheckColor() {
  // Loading
  formColor.innerHTML = loader;

  // Get data
  const carColors = await getCarColors();
  console.log("carColors", carColors);

  // Add child elements
  formColor.innerHTML = `${carColors
    .map((element, index) => {
      return generateCheckbox("Color", element.value, element.value, index);
    })
    .join("")}`;
}
async function getCarColors() {
  const { data } = await api.get(`/colors`);
  return data;
}

// Additional
async function generateFormCheckAdditional() {
  // Loading
  formAdditional.innerHTML = loader;

  // Get data
  const carAdditionals = await getCarAdditionals();
  console.log("carAdditionals", carAdditionals);

  // Add child elements
  formAdditional.innerHTML = `${carAdditionals
    .map((element, index) => {
      return generateCheckbox("Additional", element.value, element.id, index);
    })
    .join("")}`;
}
async function getCarAdditionals() {
  const { data } = await api.get(`/additional`);
  return data;
}

// Return select html element
function generateSelect(param_name, element_name, element_value, index) {
  let is_selected =
    location.search.indexOf(
      `${param_name.toLowerCase()}=${encodeURI(element_value).replaceAll(
        "%20",
        "+"
      )}`
    ) > -1
      ? "selected"
      : "";

  return `
      <option
          value="${element_value}"
          key="${index + 1}"
          ${is_selected}
      >
          ${element_name}
      </option>`;
}

// Return checkbox html element
function generateCheckbox(param_name, element_name, element_value, index) {
  let id = `form${param_name}${normalizeStringToId(element_name)}`;
  let on_change = `updateQueryParams(this, '${param_name.toLowerCase()}' ,'${element_value}')`;
  let is_checked =
    location.search.indexOf(
      `${param_name.toLowerCase()}=${encodeURI(element_value).replaceAll(
        "%20",
        "+"
      )}`
    ) > -1
      ? "checked"
      : "";

  return `
        <label for="${id}" key="${index}">
            <input
                type="checkbox"
                name="form${param_name}"
                id="${id}"
                value="${element_value}"
                onChange="${on_change}"
                ${is_checked}
            />
            ${element_name}
        </label>
    `;
}

// Normalize String to use as id
function normalizeStringToId(string) {
  newString = string
    .replaceAll("-", " ")
    .toLowerCase()
    .replaceAll(/(?:^|\s)\S/g, (a) => a.toUpperCase())
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/g, "")
    .replaceAll(/[^0-9a-zA-Zs]/g, "");

  return newString;
}

// ---------------- GENERATE FORM FIELDS - END ----------------- //

// --------------- UPDATE QUERY PARAMS - START ---------------- //

// Update query params when change form elements values
function updateQueryParams(item, name, value = 0) {
  // Get url search params
  var current_url = new URL(location.href);
  var search_params = current_url.searchParams;

  if (item.tagName.toLowerCase() === "select") {
    if (item.value) {
      // When select option is not an empty value
      search_params.set(name, item.value);
      current_url.search = search_params.toString();
    } else {
      // When select option is an empty value
      search_params.delete(name);
    }
  }

  if (
    item.tagName.toLowerCase() === "input" &&
    item.getAttribute("type") === "radio"
  ) {
    if (item.checked) {
      // When radio is checked...
      search_params.set(name, value);
      current_url.search = search_params.toString();
    } else {
      // When radio is unchecked...
      search_params.delete(name);
    }
  }

  if (
    item.tagName.toLowerCase() === "input" &&
    item.getAttribute("type") === "checkbox"
  ) {
    if (item.checked) {
      // When checkbox is checked...
      search_params.append(name, value);
      current_url.search = search_params.toString();
    } else {
      // When checkbox is unchecked...
      current_url.search = search_params
        .toString()
        .replace(`${name}=${encodeURI(value).replaceAll("%20", "+")}&`, "")
        .replace(`${name}=${encodeURI(value).replaceAll("%20", "+")}`, "");
    }
  }

  // Update browser history url
  history.pushState("", document.title, current_url.href);

  updateCarsGrid();
}

// ---------------- UPDATE QUERY PARAMS - END ----------------- //

// ---------------- UPDATE CARS GRID - START ------------------ //

// Get elements
const qtdOffers = document.querySelector("#qtdOffers");
const filteredCarsGrid = document.querySelector(
  "#filteredCars .filteredCarsGrid"
);

async function updateCarsGrid() {
  // Loading
  filteredCarsGrid.innerHTML = loader;

  // Get data
  const cars = await getCars();
  console.log("cars", cars);

  // Update qtd offers
  qtdOffers.innerHTML = `${cars.length} oferta(s)`;

  // Update catalog title
  let radioChecked = document.querySelector(
    "input[name='formCondition']:checked"
  );
  if (radioChecked) {
    let condition = await getCarCondition(radioChecked.value);
    document.querySelector(
      "#catalogTitle"
    ).innerHTML = `Carros ${condition.label.toLowerCase()}s`;
  }

  if (cars.length > 0) {
    // Add child elements
    filteredCarsGrid.innerHTML = `${cars
      .map((element, index) => {
        let slides = element.photos
          .map((item, index) => {
            return `
                    <a
                        href="car.html?car_id=${element.id}"
                        class="mySlide active"
                        data-slide-index="${index + 1}"
                        key="${index}"
                    >
                        <img
                            src="${item}"
                            alt="${element.model}"
                            loading="lazy"
                        >
                    </a>
                `;
          })
          .join("");

        return `
                <article class="carCardVertical">
    
                    <div class="carCardThumbnail">
    
                        <div class="carCardSlider">
                            <div class="mySlideList" id="car${element.id}">
                                ${slides}
                            </div>
    
                            <button class="prevCardSlide" onclick="prevCardSlide('car${
                              element.id
                            }')">
                                <img src="./img/icons/chevron-left.svg" alt="">
                            </button>
                            <button class="nextCardSlide" onclick="nextCardSlide('car${
                              element.id
                            }')">
                                <img src="./img/icons/chevron-right.svg" alt="">
                            </button>
                        </div>
    
                        <button class="carCardWishlist">
                            <img src="./img/icons/heart.svg" alt="">
                        </button>
    
                        <div class="carCardBadges">
                            ${
                              element.condition === 0
                                ? `
                                <span class="badge badgeNew">Novo</span>
                            `
                                : `
                                <span class="badge badgeUsed">Usado</span>
                            `
                            }
                        </div>
                    </div>
    
                    <div class="carCardBody">
                        <div class="carYearCompare">
                            <div class="carYear">
                                <small>${element.year}</small>
                            </div>
    
                            <label class="carCompare" for="carCompareCar${
                              element.id
                            }">
                                <input type="checkbox" id="carCompareCar${
                                  element.id
                                }" name="carCompare" value="compare">
                                <small>Compare</small>
                            </label>
                        </div>
    
                        <h3 class="carName">
                            <a href="car.html?car_id=${element.id}">
                                ${element.model}
                            </a>
                        </h3>
    
                        <p class="carPrice">
                            <strong>${element.price}</strong>
                        </p>
    
                        <p class="carLocation">
                            <img src="./img/icons/location.svg" alt="">
                            <small>${element.location}</small>
                        </p>
    
                    </div>
    
                    <div class="carCardFooter">
                        <ul class="carInfos">
                            <li title="mileage">
                                <img src="./img/icons/mileage.svg" alt="">
                                <small>${element.mileage}</small>
                            </li>
    
                            <li title="transmission">
                                <img src="./img/icons/transmission.svg" alt="">
                                <small>${element.transmission}</small>
                            </li>
    
                            <li title="fuel">
                                <img src="./img/icons/fuel.svg" alt="">
                                <small>${element.fuel}</small>
                            </li>
                        </ul>
                    </div>
    
                </article>
            `;
      })
      .join("")}`;
  } else {
    filteredCarsGrid.innerHTML = "<span>Nenhuma oferta encontrada</span>";
  }
}

async function getCars() {
  const parameterList = location.search;

  if (parameterList !== "") {
    var { data } = await api.get(`/adverts${parameterList}`);
  } else {
    var { data } = await api.get(`/adverts`);
  }

  return data;
}

// ----------------- UPDATE CARS GRID - END ------------------- //
