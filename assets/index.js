(() => {
  // Membuat car item template baru
  function carItemTemplate(car) {
    // Membuat kontainer untuk car item baru
    const mainContainer = document.createElement('article');
    mainContainer.addEventListener('contextmenu', carItemContextMenuHandler);
    mainContainer.classList.add('card', 'car-item');
    mainContainer.title = `${car.model} - ${car.series}`;
    mainContainer.dataset.id = car.id;

    // Membuat konten foto car item
    const photoContainer = document.createElement('div');
    photoContainer.classList.add('car-item__photo');
    photoContainer.innerHTML = `
      <img
        src="${car.photoUrl}"
        alt="${car.model}"
      >
    `;

    // Membuat konten informasi car item
    const informationContainer = document.createElement('div');
    informationContainer.classList.add('car-item__model');
    informationContainer.textContent = car.model;

    // Memasukkan seluruh konten ke kontainer utama (item)
    mainContainer.append(photoContainer, informationContainer);

    return mainContainer;
  }

  // Menambahkan item baru dalam array allCars
  function insertCar({ model, series, photoUrl }) {
    const newCar = { id: Number(new Date()), model, series, photoUrl };
    allCars.push(newCar);

    return newCar;
  }

  // Menghilangkan item dalam array allCars berdasarkan `id`
  function removeCar(id) {
    const filtered = getAllCars().filter((car) => car.id != id);

    console.log(filtered);
    allCars = filtered;
  }

  // Render seluruh car dalam car list array
  function renderCarList() {
    const cars = getAllCars();

    carsList.innerHTML = '';
    if (cars.length <= 0) {
      carsList.textContent = `Data kosong`;
    } else {
      for (const car of cars) {
        carsList.appendChild(carItemTemplate(car));
      }
    }
  }

  // Mendapatkan seluruh cars item
  function getAllCars() {
    return [...allCars];
  }

  // Reset input value
  function resetForm() {
    carModel.value = '';
    carSeries.value = '';
    carPhotoUrl.value = '';
  }

  // Create logic for adding new car
  const carsForm = document.getElementById('cars-form');
  const carModel = carsForm.elements.carModel;
  const carSeries = carsForm.elements.carSeries;
  const carPhotoUrl = carsForm.elements.carPhotoUrl;

  const carsList = document.getElementById('cars-list');

  carsForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const carModelValue = carModel.value;
    const carSeriesValue = carSeries.value;
    const carPhotoUrlValue = carPhotoUrl.value;

    const newCar = insertCar({
      model: carModelValue,
      series: carSeriesValue,
      photoUrl: carPhotoUrlValue
    });

    if (!newCar) return;

    renderCarList();
    resetForm();
  });

  function drawerInit() {
    const drawerButton = document.querySelector('#drawer-button');
    const drawerNavigation = document.querySelector('#main-nav');

    drawerButton.addEventListener('click', () => {
      drawerNavigation.classList.toggle('open');
    });

    document.body.addEventListener('click', (event) => {
      if (
        !drawerNavigation.contains(event.target) &&
        !drawerButton.contains(event.target)
      ) {
        drawerNavigation.classList.remove('open');
      }
    });
  }

  // Create custom context on car item
  const customContextMenu = document.getElementById('custom-context-menu');
  const customContextMenuDelete = customContextMenu.querySelector('#delete-menu');

  // Create custom context menu logic
  [...carsList.children].forEach((element) => {
    element.addEventListener('contextmenu', carItemContextMenuHandler);
  });

  function carItemContextMenuHandler(event) {
    event.preventDefault();

    const x = event.pageX;
    const y = event.pageY;

    customContextMenu.style.left = `${x}px`;
    customContextMenu.style.top = `${y}px`;
    customContextMenu.style.visibility = 'visible';
    customContextMenu.style.scale = '1';

    const id = event.currentTarget.dataset.id;
    customContextMenuDelete.dataset.carId = id;
  }

  customContextMenuDelete.addEventListener('click', (event) => {
    const carId = event.currentTarget.dataset.carId;
    removeCar(carId);

    renderCarList();
  });

  window.addEventListener('click', () => (customContextMenu.style.visibility = 'hidden'));



  function init() {
    drawerInit();
    renderCarList();
  }

  init();
})();
