
// Inicialización y configuración inicial
document.addEventListener('DOMContentLoaded', function () {
    const radioSi = document.getElementById('exampleRadios1');
    const radioNo = document.getElementById('exampleRadios2');
    const enfermedadInput = document.getElementById('enfermedad_cronica');
    const btnAgregar = document.getElementById('btn-agregar');
    const btnGuardar = document.getElementById('btn-guardar');
    const btnCerrar = document.getElementById('btn-cerrar');
    const propietarioId = propietario_Id;

    initializeMap();
    loadSavedLocations();
    cargarMascotas();

    toggleEnfermedadInput();
    radioSi.addEventListener('change', toggleEnfermedadInput);
    radioNo.addEventListener('change', toggleEnfermedadInput);

    btnAgregar.addEventListener('click', () => {
        cargarEspecies();
        cargarGeneros();
    });

    btnCerrar.addEventListener('click', () => {
        resetFormAndMap();
        reserModal();
    });

    btnGuardar.addEventListener('click', async (event) => {

        console.log(latitude, longitude, placeName, description)
        event.preventDefault();
        const fotoRuta = document.getElementById('previewImage').src;
        let fullPath = document.getElementById('previewImage').src;
        let url = new URL(fullPath);
        let localPath = url.pathname;

        const formData = {
            nombre: document.getElementById('nombre_mascota').value,
            especie_id: document.getElementById('especie').value,
            raza: document.getElementById('raza').value,
            genero_id: document.getElementById('genero').value,
            fecha_nacimiento: document.getElementById('fecha_nacimiento').value,
            color: document.getElementById('color').value,
            peso: document.getElementById('peso').value,
            foto: localPath,
            enfermedad_cronica: document.getElementById('enfermedad_cronica').value,
            propietario_id: propietarioId,
            nombreUbicacion: placeName,
            latitud: latitude, 
            longitud: longitude,
            descripcion_adicional: description
        };

        try {
            const response = await fetch('mis-mascotas/registrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
 
                toastr.success('Mascota registrada exitosamente');
                  reserModal();
                  resetFormAndMap();
                  window.location.href = '/mias-mascotas';
            } else {
                const errorResult = await response.json();
                toastr.error('Error al registrar la mascota: ' + errorResult.message);
            }
        } catch (error) {
            toastr.error('Error de conexión con la API');
        }
    });

    function toggleEnfermedadInput() {
        if (radioSi.checked) {
            enfermedadInput.disabled = false;
            enfermedadInput.setAttribute('required', '');
        } else if (radioNo.checked) {
            enfermedadInput.disabled = true;
            enfermedadInput.value = '';
            enfermedadInput.removeAttribute('required');
        }
    }
});

// Cargar datos
function cargarEspecies() {
    fetch('/mis-mascotas/especies')
        .then(response => response.json())
        .then(data => {
            const especieSelect = document.getElementById('especie');
            especieSelect.innerHTML = '<option value="" selected disabled>Elija una especie</option>';
            data.forEach(especie => {
                let option = document.createElement('option');
                option.value = especie.especie_id;
                option.textContent = especie.nombre_especie;
                especieSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar las especies:', error));
}

function cargarGeneros() {
    fetch('/mis-mascotas/generos')
        .then(response => response.json())
        .then(data => {
            const generoSelect = document.getElementById('genero');
            generoSelect.innerHTML = '<option value="" selected disabled>Elija un género</option>';
            data.forEach(genero => {
                let option = document.createElement('option');
                option.value = genero.genero_id;
                option.textContent = genero.nombre_genero;
                generoSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar los generos:', error));
}

function cargarMascotas() {
    fetch('mis-mascotas/mis-mascotas')
        .then(response => response.json())
        .then(data => {
            const mascotasTableBody = document.getElementById('mascotasTableBody');
            mascotasTableBody.innerHTML = '';
            if (data.length === 0) {
                mascotasTableBody.innerHTML = '<tr><td colspan="9" class="text-center">No tienes mascotas registradas.</td></tr>';
            } else {
                data.forEach(mascota => {
                  
                    const row = document.createElement('tr');
                   
                    row.innerHTML = `
              <td><button class="btn btn-secondary btn-detalles" data-id="${mascota.mascota_id}">Detalles</button></td>
              <td>${mascota.nombre}</td>
              <td>${mascota.nombre_especie}</td>
              <td>${mascota.raza}</td>
              <td>${mascota.nombre_genero}</td>
              <td>${new Date(mascota.fecha_nacimiento).toLocaleDateString()}</td>
              <td>${mascota.color}</td>
              <td>${mascota.peso} lbs.</td>
              <td>${mascota.enfermedad_cronica || 'N/A'}</td>
              <td><img src="${mascota.foto}" alt="${mascota.nombre}" class="img-fluid"></td>`;
                    mascotasTableBody.appendChild(row);
                });
                document.querySelectorAll('.btn-detalles').forEach(button => {
                    button.addEventListener('click', function () {
                        const mascotaId = this.getAttribute('data-id');
                        const mascotaSeleccionada = data.find(m => m.mascota_id == mascotaId);
                        sessionStorage.setItem('mascotaSeleccionada', JSON.stringify(mascotaSeleccionada));
                        window.location.href = `/mias-mascotas/detalles/${mascotaId}`;
                    });
                });
                $('#mascotasTable').DataTable({
                    responsive: true,
                    language: { url: "//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json" }
                });
            }
        })
        .catch(error => {
            console.error('Error al cargar las mascotas:', error);
            const mascotasTableBody = document.getElementById('mascotasTableBody');
            mascotasTableBody.innerHTML = '<tr><td colspan="9" class="text-center text-danger">No se encontraron mascotas.</td></tr>';
        });
}

// Lógica de mapas
let manualMap, manualMarker;
const guatemalaCoords = [14.6349, -90.5069];

// Variables globales para latitud, longitud, nombre y descripción
let latitude, longitude, placeName, description;

function sendLocation() {
    resetFormAndMap();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocalización no es soportada por este navegador.");
    }
}

function toggleManualLocation() {
    resetFormAndMap();
    const locationInfo = document.getElementById('locationInfo');
    if (locationInfo.style.display === 'none') {
        locationInfo.style.display = 'block';
        initializeMap();
    } else {
        locationInfo.style.display = 'none';
    }
}

function initializeMap() {
    if (!manualMap) {
        manualMap = L.map('manual-map').setView(guatemalaCoords, 7);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(manualMap);
        manualMap.panBy([0, -110]);
        manualMap.on('dblclick', function (e) {
            const userConfirmed = confirm("¿Desea agregar un punto en esta ubicación?");
            if (userConfirmed) {
                if (manualMarker) {
                    manualMap.removeLayer(manualMarker);
                }
                manualMarker = L.marker(e.latlng).addTo(manualMap);
                latitude = e.latlng.lat; // Asignar latitud global
                longitude = e.latlng.lng; // Asignar longitud global
                placeName = prompt("Ingresa el nombre del lugar:"); // Asignar nombre global
                if (placeName) {
                    description = prompt("Ingresa una descripcion más precisa del lugar:"); // Asignar descripción global
                    manualMarker.bindPopup(`<strong>${placeName}</strong><br>${description}`).openPopup();
                    manualMarker.on('popupclose', function () {
                        resetFormAndMap();
                    });
                    saveManualLocation(latitude, longitude, placeName, description);
                }
            }
        });
    } else {
        manualMap.setView(guatemalaCoords, 7);
        manualMap.panBy([0, -110]);
        manualMap.invalidateSize();
    }
}

function showPosition(position) {
    latitude = position.coords.latitude; // Asignar latitud global
    longitude = position.coords.longitude; // Asignar longitud global
    placeName = prompt("Ingresa el nombre del lugar para tu ubicación actual:"); // Asignar nombre global
    description = prompt("Ingresa una descripción para tu ubicación actual:"); // Asignar descripción global
    if (placeName && description) {
        const locationData = {
            latitude: latitude,
            longitude: longitude,
            name: placeName,
            description: description
        };
        const locations = JSON.parse(localStorage.getItem('locations')) || [];
        locations.push(locationData);
        localStorage.setItem('locations', JSON.stringify(locations));
        console.log(locationData);
        const locationInfo = document.getElementById('locationInfo');
        locationInfo.style.display = 'block';
        initializeMap();
        manualMap.setView([latitude, longitude], 15);
        if (manualMarker) {
            manualMap.removeLayer(manualMarker);
        }
        manualMarker = L.marker([latitude, longitude]).addTo(manualMap);
        manualMarker.bindPopup(`<strong>${placeName}</strong><br>${description}`).openPopup();
        manualMarker.on('popupclose', function () {
            resetFormAndMap();
        });
        document.getElementById('locationSearch').disabled = true;
        document.querySelector("button[onclick='searchLocation()']").disabled = true;
    } else {
        alert("Se requiere ingresar un nombre y una descripción para la ubicación.");
    }
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("Permiso denegado por el usuario.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Información de ubicación no disponible.");
            break;
        case error.TIMEOUT:
            alert("El tiempo de la solicitud ha expirado.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Ocurrió un error desconocido.");
            break;
    }
}

function reserModal(){
    const modalElement = document.getElementById('registroModal');
                  const modal = bootstrap.Modal.getInstance(modalElement);
                  modal.hide();
                  document.getElementById('regForm').reset();
                  document.getElementById('previewImage').src = '/public/images/default.jpg';
                  document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());
}

function resetFormAndMap() {
    const locationInfo = document.getElementById('locationInfo');
    locationInfo.style.display = 'none';
    if (manualMarker) {
        manualMap.removeLayer(manualMarker);
        manualMarker = null;
    }
    manualMap.setView(guatemalaCoords, 7);
    document.getElementById('locationSearch').value = '';
    document.getElementById('locationSearch').disabled = false;
    document.querySelector("button[onclick='searchLocation()']").disabled = false;
    localStorage.removeItem('locations');
}

function searchLocation() {
    const locationName = document.getElementById('locationSearch').value;
    if (locationName) {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const { lat, lon } = data[0];
                    manualMap.setView([lat, lon], 13);
                } else {
                    alert("No se encontró la ubicación. Inténtalo de nuevo.");
                }
            })
            .catch(error => {
                console.error('Error al buscar la ubicación:', error);
                alert("Ocurrió un error al buscar la ubicación.");
            });
    } else {
        alert("Por favor, ingresa el nombre de un lugar para buscar.");
    }
}

function saveManualLocation(latitude, longitude, name, descripcion) {
    const locationData = {
        latitude: latitude,
        longitude: longitude,
        name: name,
        descripcion: descripcion
    };
    const locations = JSON.parse(localStorage.getItem('locations')) || [];
    locations.push(locationData);
    localStorage.setItem('locations', JSON.stringify(locations));
    console.log(locationData);
}

function loadSavedLocations() {
    const locations = JSON.parse(localStorage.getItem('locations')) || [];
    locations.forEach(location => {
        const marker = L.marker([location.latitude, location.longitude]).addTo(manualMap);
        marker.bindPopup(location.name).openPopup();
    });
}

// Función de carga de imagen
async function uploadImage(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];
    const formData = new FormData();
    if (!file) {
        toastr.error('No se seleccionó ningún archivo');
        return null;
    }
    let processedFile = file;
    if (file.type === "image/heic" || file.type === "image/heif") {
        try {
            const blob = await heic2any({ blob: file, toType: "image/jpeg" });
            processedFile = new File([blob], file.name.replace(/\.\w+$/, ".jpg"), { type: "image/jpeg" });
        } catch (error) {
            console.error('Error al convertir la imagen:', error);
            toastr.error('Error al convertir la imagen HEIC');
            return null;
        }
    }
    formData.append('foto', processedFile);
    try {
        const response = await fetch('/upload', { method: 'POST', body: formData });
        const data = await response.json();
        if (response.ok) {
            const previewImage = document.getElementById('previewImage');
            console.log(data)
            previewImage.src = data.filePath;
            return data.filePath;
        } else {
            toastr.error('Error al subir la imagen');
            return null;
        }
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        toastr.error('Error al subir la imagen');
        return null;
    }
}

