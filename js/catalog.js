// Api
const url = "https://e-carros-api.herokuapp.com/";
const api = axios.create({ baseURL: url, });

// Loader
const loader = "<span>Carregando...</span>";


// --------------- GENERATE FORM FIELDS - START ---------------- //

// Get elements
const formCheckType = document.querySelector('#formCheckType');
const formSelectBrand = document.querySelector('#formSelectBrand');
const formCheckFuel = document.querySelector('#formCheckFuel');
const formCheckTransmission = document.querySelector('#formCheckTransmission');
const formSelectMileage = document.querySelector('#formSelectMileage');
const formCheckColor = document.querySelector('#formCheckColor');
const formCheckAdditional = document.querySelector('#formCheckAdditional');

// Update all form fields
async function generateFormFields() {
    await generateFormCheckType();
    await generateFormSelectBrand();
    await generateFormCheckFuel();
    await generateFormCheckTransmission();
    await generateFormSelectMileage();
    await generateFormCheckColor();
    await generateFormCheckAdditional();
}

// Type
async function generateFormCheckType() {
    // Loading
    formCheckType.innerHTML = loader;
    
    // Get data
    const carTypes = await getCarTypes();
    console.log("carTypes", carTypes);
    
    // Add child elements
    formCheckType.innerHTML = `${carTypes.map((elemento, index) => { return `
        <label for="formCheckType${normalizeStringToId(elemento)}" key="${index}">
            <input
                type="checkbox"
                name="formCheckType${normalizeStringToId(elemento)}"
                id="formCheckType${normalizeStringToId(elemento)}"
                value="${elemento}"
                onChange="updateQueryParams(this, 'type' ,'${elemento}')"
            />
            ${elemento}
        </label>
    `}).join("")}`;
}
async function getCarTypes() {
    const {data} = await api.get(`/cartype`);
    return data;
}

// Brand
async function generateFormSelectBrand() {
    // Loading
    formSelectBrand.innerHTML = loader;
    
    // Get data
    const carBrands = await getCarBrands();
    console.log("carBrands", carBrands);
    
    // Add child elements
    formSelectBrand.innerHTML = `
    <option value="" key="0">Marca</option>
    ${carBrands.map((elemento, index) => { return `
        <option value="${elemento.id}" key="${index+1}">
            ${elemento.name}
        </option>
    `}).join("")}`;
    
    // Add event on change
    formSelectBrand.addEventListener('change', () => updateQueryParams(formSelectBrand, 'brand'));
}
async function getCarBrands() {
    const {data} = await api.get(`/brands`);
    return data;
}

// Fuel
async function generateFormCheckFuel() {
    // Loading
    formCheckFuel.innerHTML = loader;
    
    // Get data
    const carFuels = await getCarFuels();
    console.log("carFuels", carFuels);
    
    // Add child elements
    formCheckFuel.innerHTML = `${carFuels.map((elemento, index) => { return `
        <label for="formCheckFuel${normalizeStringToId(elemento)}" key="${index}">
            <input
                type="checkbox"
                name="formCheckFuel${normalizeStringToId(elemento)}"
                id="formCheckFuel${normalizeStringToId(elemento)}"
                value="${elemento}"
                onChange="updateQueryParams(this, 'fuel' ,'${elemento}')"
            />
            ${elemento}
        </label>
    `}).join("")}`;
}
async function getCarFuels() {
    const {data} = await api.get(`/fuel`);
    return data;
}

// Transmission
async function generateFormCheckTransmission() {
    // Loading
    formCheckTransmission.innerHTML = loader;
    
    // Get data
    const carTransmissions = await getCarTransmissions();
    console.log("carTransmissions", carTransmissions);
    
    // Add child elements
    formCheckTransmission.innerHTML = `${carTransmissions.map((elemento, index) => { return `
        <label for="formCheckTransmission${normalizeStringToId(elemento)}" key="${index}">
            <input
                type="checkbox"
                name="formCheckTransmission${normalizeStringToId(elemento)}"
                id="formCheckTransmission${normalizeStringToId(elemento)}"
                value="${elemento}"
                onChange="updateQueryParams(this, 'transmission' ,'${elemento}')"
            />
            ${elemento}
        </label>
    `}).join("")}`;
}
async function getCarTransmissions() {
    const {data} = await api.get(`/transmission`);
    return data;
}

// Mileage
async function generateFormSelectMileage() {
    // Loading
    formSelectMileage.innerHTML = loader;
    
    // Get data
    const carMileages = await getCarMileages();
    console.log("carMileages", carMileages);
    
    // Add child elements
    formSelectMileage.innerHTML = `
    <option value="" key="0">Todas</option>
    ${carMileages.map((elemento, index) => { return `
        <option value="${elemento}" key="${index+1}">
            ${elemento}
        </option>
    `}).join("")}`;
    
    // Add event on change
    formSelectMileage.addEventListener('change', () => updateQueryParams(formSelectMileage, 'mileage'));
}
async function getCarMileages() {
    const {data} = await api.get(`/mileage`);
    return data;
}

// Car colors
async function generateFormCheckColor() {
    // Loading
    formCheckColor.innerHTML = loader;
    
    // Get data
    const carColors = await getCarColors();
    console.log("carColors", carColors);
    
    // Add child elements
    formCheckColor.innerHTML = `${carColors.map((elemento, index) => { return `
        <label for="formCheckColor${normalizeStringToId(elemento)}" key="${index}">
            <input
                type="checkbox"
                name="formCheckColor${normalizeStringToId(elemento)}"
                id="formCheckColor${normalizeStringToId(elemento)}"
                value="${elemento}"
                onChange="updateQueryParams(this, 'color' ,'${elemento}')"
            />
            ${elemento}
        </label>
    `}).join("")}`;
}
async function getCarColors() {
    const {data} = await api.get(`/colors`);
    return data;
}

// Additional
async function generateFormCheckAdditional() {
    // Loading
    formCheckAdditional.innerHTML = loader;
    
    // Get data
    const carAdditionals = await getCarAdditionals();
    console.log("carAdditionals", carAdditionals);
    
    // Add child elements
    formCheckAdditional.innerHTML = `${carAdditionals.map((elemento, index) => { return `
        <label for="formCheckAdditional${normalizeStringToId(elemento)}" key="${index}">
            <input
                type="checkbox"
                name="formCheckAdditional${normalizeStringToId(elemento)}"
                id="formCheckAdditional${normalizeStringToId(elemento)}"
                value="${elemento}"
                onChange="updateQueryParams(this, 'additional' ,'${elemento}')"
            />
            ${elemento}
        </label>
    `}).join("")}`;
}
async function getCarAdditionals() {
    const {data} = await api.get(`/additional`);
    return data;
}

// Normalize String to use as id
function normalizeStringToId(string) {
    return string
        .replace("-", " ")
        .toLowerCase()
        .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^0-9a-zA-Zs]/g, "")
}

// ---------------- GENERATE FORM FIELDS - END ----------------- //




// --------------- UPDATE QUERY PARAMS - START ---------------- //

// Update query params when change form elements values
function updateQueryParams(item, name, value = 0) {

    // Get url search params
    var current_url = new URL(location.href);
    var search_params = current_url.searchParams;

    if (item.tagName.toLowerCase() === 'select') {
        if(item.value){
            // When select option is not an empty value
            search_params.set(name, item.value);
            current_url.search = search_params.toString();
        } else{
            // When select option is an empty value
            search_params.delete(name);
        }
    }

    if (
        item.tagName.toLowerCase() === 'input' &&
        item.getAttribute('type') === 'checkbox'
    ) {
        if(item.checked){
            // When checkbox is checked...
            search_params.append(name, value);
            current_url.search = search_params.toString();
        } else{
            // When checkbox is unchecked...
            current_url.search = search_params.toString()
                                    .replace(`${name}=${encodeURI(value).replace('%20', '+')}&`, '')
                                    .replace(`${name}=${encodeURI(value).replace('%20', '+')}`, '');
        }
    }

    // Update browser history url
    history.pushState('', document.title, current_url.href);

    updateCarsGrid();
}

// ---------------- UPDATE QUERY PARAMS - END ----------------- //




// ---------------- UPDATE CARS GRID - START ------------------ //

// Get elements
const qtdOffers = document.querySelector('#qtdOffers');
const filteredCarsGrid = document.querySelector('#filteredCars .filteredCarsGrid');

async function updateCarsGrid() {
    // Loading
    filteredCarsGrid.innerHTML = loader;

    // Get data
    const cars = await getCars();
    console.log("cars", cars);

    // Update qtd offers
    qtdOffers.innerHTML = `${cars.length} oferta(s)`;

    if(cars.length > 0) {
        // Add child elements
        filteredCarsGrid.innerHTML = `${cars.map((elemento, index) => {
    
            const slides = elemento.photos.map((item, index) => {
                return `
                    <a
                        href="single-item.html"
                        class="mySlide active"
                        data-slide-index="${index + 1}"
                        key="${index}"
                    >
                        <img
                            src="${item}"
                            alt="${elemento.model}"
                            loading="lazy"
                        >
                    </a>
                `;
            }).join("");
    
            return `
                <article class="carCardVertical">
    
                    <div class="carCardThumbnail">
    
                        <div class="carCardSlider">
                            <div class="mySlideList" id="car${elemento.id}">
                                ${slides}
                            </div>
    
                            <button class="prevCardSlide" onclick="prevCardSlide('car${elemento.id}')">
                                <img src="./img/icons/chevron-left.svg" alt="">
                            </button>
                            <button class="nextCardSlide" onclick="nextCardSlide('car${elemento.id}')">
                                <img src="./img/icons/chevron-right.svg" alt="">
                            </button>
                        </div>
    
                        <button class="carCardWishlist">
                            <img src="./img/icons/heart.svg" alt="">
                        </button>
    
                        <div class="carCardBadges">
                            ${elemento.condition === "Novo" ? (`
                                <span class="badge badgeNew">Novo</span>
                            `) : (`
                                <span class="badge badgeUsed">Usado</span>
                            `)}
                        </div>
                    </div>
    
                    <div class="carCardBody">
                        <div class="carYearCompare">
                            <div class="carYear">
                                <small>${elemento.year}</small>
                            </div>
    
                            <label class="carCompare" for="carCompareCar${elemento.id}">
                                <input type="checkbox" id="carCompareCar${elemento.id}" name="carCompare" value="compare">
                                <small>Compare</small>
                            </label>
                        </div>
    
                        <h3 class="carName">
                            <a href="single-item.html">
                                ${elemento.model}
                            </a>
                        </h3>
    
                        <p class="carPrice">
                            <strong>${elemento.price}</strong>
                        </p>
    
                        <p class="carLocation">
                            <img src="./img/icons/location.svg" alt="">
                            <small>${elemento.location}</small>
                        </p>
    
                    </div>
    
                    <div class="carCardFooter">
                        <ul class="carInfos">
                            <li title="mileage">
                                <img src="./img/icons/mileage.svg" alt="">
                                <small>${elemento.mileage}</small>
                            </li>
    
                            <li title="transmission">
                                <img src="./img/icons/transmission.svg" alt="">
                                <small>${elemento.transmission}</small>
                            </li>
    
                            <li title="fuel">
                                <img src="./img/icons/fuel.svg" alt="">
                                <small>${elemento.fuel}</small>
                            </li>
                        </ul>
                    </div>
    
                </article>
            `
        }).join("")}`;
    } else {
        filteredCarsGrid.innerHTML = "<span>Nenhuma oferta encontrada</span>";
    }
}

async function getCars() {
    const parameterList = location.search;

    if(parameterList !== "") {
        var {data} = await api.get(`/adverts${parameterList}`);
    } else {
        var {data} = await api.get(`/adverts`);
    }

    return data;
}

// ----------------- UPDATE CARS GRID - END ------------------- //


window.onload = () => {
    generateFormFields();
    updateCarsGrid();
};