// Api
const url = "https://e-carros-api.herokuapp.com/";
const api = axios.create({ baseURL: url, });

// Loader
const loader = document.createElement("span");
const textLoader = document.createTextNode("Carregando...");
loader.appendChild(textLoader);

// Get elements
const formCheckType = document.querySelector('#formCheckType');
const formSelectBrand = document.querySelector('#formSelectBrand');
const formCheckFuel = document.querySelector('#formCheckFuel');
const formCheckTransmission = document.querySelector('#formCheckTransmission');
const formSelectMileage = document.querySelector('#formSelectMileage');
const formCheckColor = document.querySelector('#formCheckColor');
const formCheckAdditional = document.querySelector('#formCheckAdditional');

// Update all form fields
async function updateFormFields() {
    await updateFormCheckType();
    await updateFormSelectBrand();
    await updateFormCheckFuel();
    await updateFormCheckTransmission();
    await updateFormSelectMileage();
    await updateFormCheckColor();
    await updateFormCheckAdditional();
}
updateFormFields();

// Type
async function updateFormCheckType() {
    // Loading
    formCheckType.appendChild(loader);
    // Get data
    const carTypes = await getCarTypes();
    console.log("carTypes", carTypes);
    // Add child elements
    formCheckType.innerHTML = `${carTypes.map((elemento, index) => { return `
        <label for="formCheckType${normalizeString(elemento)}" key="${index}">
            <input
                type="checkbox"
                name="formCheckType${normalizeString(elemento)}"
                id="formCheckType${normalizeString(elemento)}"
                value="${elemento}"
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
async function updateFormSelectBrand() {
    // Loading
    formSelectBrand.appendChild(loader);
    // Get data
    const carBrands = await getCarBrands();
    console.log("carBrands", carBrands);
    // Add child elements
    formSelectBrand.innerHTML = `
    <option value="">Marca</option>
    ${carBrands.map((elemento) => { return `
        <option value="${elemento.name}" key="${elemento.id}">
            ${elemento.name}
        </option>
    `}).join("")}`;
}
async function getCarBrands() {
    const {data} = await api.get(`/brands`);
    return data;
}

// Fuel
async function updateFormCheckFuel() {
    // Loading
    formCheckFuel.appendChild(loader);
    // Get data
    const carFuels = await getCarFuels();
    console.log("carFuels", carFuels);
    // Add child elements
    formCheckFuel.innerHTML = `${carFuels.map((elemento, index) => { return `
        <label for="formCheckFuel${normalizeString(elemento)}" key="${index}">
            <input
                type="checkbox"
                name="formCheckFuel${normalizeString(elemento)}"
                id="formCheckFuel${normalizeString(elemento)}"
                value="${elemento}"
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
async function updateFormCheckTransmission() {
    // Loading
    formCheckTransmission.appendChild(loader);
    // Get data
    const carTransmissions = await getCarTransmissions();
    console.log("carTransmissions", carTransmissions);
    // Add child elements
    formCheckTransmission.innerHTML = `${carTransmissions.map((elemento, index) => { return `
        <label for="formCheckTransmission${normalizeString(elemento)}" key="${index}">
            <input
                type="checkbox"
                name="formCheckTransmission${normalizeString(elemento)}"
                id="formCheckTransmission${normalizeString(elemento)}"
                value="${elemento}"
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
async function updateFormSelectMileage() {
    // Loading
    formSelectMileage.appendChild(loader);
    // Get data
    const carMileages = await getCarMileages();
    console.log("carMileages", carMileages);
    // Add child elements
    formSelectMileage.innerHTML = `
    <option value="">Todas</option>
    ${carMileages.map((elemento, index) => { return `
        <option value="${normalizeString(elemento)}" key="${index}">
            ${elemento}
        </option>
    `}).join("")}`;
}
async function getCarMileages() {
    const {data} = await api.get(`/mileage`);
    return data;
}

// Car colors
async function updateFormCheckColor() {
    // Loading
    formCheckColor.appendChild(loader);
    // Get data
    const carColors = await getCarColors();
    console.log("carColors", carColors);
    // Add child elements
    formCheckColor.innerHTML = `${carColors.map((elemento, index) => { return `
        <label for="formCheckColor${normalizeString(elemento)}" key="${index}">
            <input
                type="checkbox"
                name="formCheckColor${normalizeString(elemento)}"
                id="formCheckColor${normalizeString(elemento)}"
                value="${elemento}"
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
async function updateFormCheckAdditional() {
    // Loading
    formCheckAdditional.appendChild(loader);
    // Get data
    const carAdditionals = await getCarAdditionals();
    console.log("carAdditionals", carAdditionals);
    // Add child elements
    formCheckAdditional.innerHTML = `${carAdditionals.map((elemento, index) => { return `
        <label for="formCheckAdditional${normalizeString(elemento)}" key="${index}">
            <input
                type="checkbox"
                name="formCheckAdditional${normalizeString(elemento)}"
                id="formCheckAdditional${normalizeString(elemento)}"
                value="${elemento}"
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
function normalizeString(string) {
    return string
        .replace("-", " ")
        .toLowerCase()
        .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^0-9a-zA-Zs]/g, "")
}