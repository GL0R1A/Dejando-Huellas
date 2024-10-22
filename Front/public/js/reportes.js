
let reports = [];
document.addEventListener('DOMContentLoaded', function () {

    updateReports();
    initializeMap();
    loadSavedLocations();

});

// Función para añadir un nuevo reporte al DOM
function addNewReportToDOM(report) {
    const reportsContainer = document.getElementById('reportsContainer');
    if (!reportsContainer) {
        console.error('El elemento con ID "reportsContainer" no se encontró en el DOM.');
        return;
    }

    const reportCard = document.createElement('div');
    const fecha_desaparicion = formatDate(new Date(report.fecha_desaparicion));
    reportCard.className = 'report-card';
    reportCard.innerHTML = `
        <img src="${report.foto}" alt="${report.nombre}">
        <h3>${report.nombre}</h3>
        <h5>${report.raza}</h5>
        <strong>Desapareció el:</strong>
        <h2>${fecha_desaparicion} ${report.hora_desaparicion}</h2>
        <div class="overlay-des">
            <div class="overlay-text">Desaparecido</div>
        </div>
    `;

    // Seleccionar el overlay dentro de reportCard
    const overlay = reportCard.querySelector('.overlay-des');
    const overlayText = reportCard.querySelector('.overlay-text');

    // Cambiar las clases y texto según el estado del reporte
    if (report.activo === 0) {
        overlay.className = 'overlay-ap'; // Cambiar clase a 'overlay-ap'
        overlayText.textContent = 'Encontrado'; // Cambiar texto a 'Encontrado'
    } else if (report.activo === 1) {
        overlay.className = 'overlay-des'; // Cambiar clase a 'overlay-des'
        overlayText.textContent = 'Desaparecido'; // Cambiar texto a 'Desaparecido'
    }

    // Agrega un evento clic para mostrar los detalles del reporte
    reportCard.onclick = () => showReport(report.identificador_qr);
    reportsContainer.prepend(reportCard); // Agregar al inicio para que los nuevos aparezcan arriba
}

// Llamar a la función para cargar reportes desde la API
async function updateReports() {
    const reportsContainer = document.getElementById('reportsContainer');
    if (!reportsContainer) {
        console.error('El elemento con ID "reportsContainer" no se encontró en el DOM.');
        return;
    }

    reportsContainer.innerHTML = ''; // Limpiar contenedor

    try {
        const response = await fetch('info/reporte/getReporteDes');
        // Verifica si la respuesta es correcta (status 200-299)
        if (!response.ok) {
            throw new Error('Error al obtener los reportes: ' + response.statusText);
        }

        const reports = await response.json(); // Supone que la respuesta es en formato JSON

        // Verifica si no hay reportes
        if (reports.length === 0) {
            const noReportsMessage = document.createElement('p');
            noReportsMessage.textContent = 'No hay reportes disponibles.';
            reportsContainer.appendChild(noReportsMessage);
        } else {
            // Itera sobre cada reporte y crea una tarjeta
            reports.forEach(report => {
                addNewReportToDOM(report); // Utiliza la función para añadir reportes al DOM
            });
        }
    } catch (error) {
        console.error('Error:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'No hay reportes para mostrar';
        reportsContainer.appendChild(errorMessage);
    }
}



// async function updateReports() {
//     const reportsContainer = document.getElementById('reportsContainer');
//     if (!reportsContainer) {
//         console.error('El elemento con ID "reportsContainer" no se encontró en el DOM.');
//         return;
//     }

//     reportsContainer.innerHTML = '';

//     try {
//         const response = await fetch('info/reporte/getReporteDes');
//         // Verifica si la respuesta es correcta (status 200-299)
//         if (!response.ok) {
//             throw new Error('Error al obtener los reportes: ' + response.statusText);
//         }

//         reports = await response.json(); // Supone que la respuesta es en formato JSON

//         // Verifica si no hay reportes
//         if (reports.length === 0) {
//             const noReportsMessage = document.createElement('p');
//             noReportsMessage.textContent = 'No hay reportes disponibles.';
//             reportsContainer.appendChild(noReportsMessage);
//         } else {
//             // Itera sobre cada reporte y crea una tarjeta
//             reports.forEach(report => {
//                 const reportCard = document.createElement('div');
//                 const fecha_desaparicion = formatDate(new Date(report.fecha_desaparicion));
//                 reportCard.className = 'report-card';
//                 reportCard.innerHTML = `
//                     <img src="${report.foto}" alt="${report.nombre}">
//                     <h3>${report.nombre}</h3>
//                     <h5>${report.raza}</h5>
//                     <strong>Desapareció el:</strong>
//                     <h2>${fecha_desaparicion} ${report.hora_desaparicion}</h2>
//                     <div class="overlay">
//                         <div class="overlay-text">Desaparecido</div>
//                     </div>
//                 `;
//                 // Agrega un evento clic para mostrar los detalles del reporte
//                 reportCard.onclick = () => showReport(report.identificador_qr);
//                 //reportCard.onclick = () => showReportDetails(report);
//                 reportsContainer.appendChild(reportCard);
//             });
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         const errorMessage = document.createElement('p');
//         errorMessage.textContent = 'No se pudieron cargar los reportes. Inténtalo más tarde.';
//         reportsContainer.appendChild(errorMessage);
//     }
// }

function showReport(codigo) {
    window.location.href = `/info/${codigo}`
}
async function addReport  (event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Obtener los valores de los campos del formulario
    const mascotaId = document.getElementById('mascotaId').value;
    const fechaDesaparicion = document.getElementById('disappearanceDate').value;
    const horaDesaparicion = document.getElementById('disappearanceTime').value;
    const descripcion = document.getElementById('description').value;

    if (placeName && latitude && longitude && description) {

        if (mascotaId && fechaDesaparicion && horaDesaparicion && descripcion) {
            const formData = {
                fecha_desaparicion: fechaDesaparicion,
                hora_desaparicion: horaDesaparicion,
                descripcion_desaparicion: descripcion,
                nombreUbicacion: placeName,
                descripcionUbicacion: description,
                latitud: latitude,
                longitud: longitude,
                mascotaid_desaparicion: mascotaId
            };

            try {
                const response = await fetch('info/reporte/Des', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });


                if (response.ok) {
                    const result = await response.json();
                    toastr.success("Reporte Creado")
                       setTimeout(() => {
                        closeModal();
                        window.location.href='reportesMascotas'
                    }, 1500);
                    

                } else {
                    const errorResult = await response.json();
                    toastr.error('Error al crear el reporte: ' + errorResult.message);
                }
            } catch (error) {
                toastr.error('Error de conexión con la API', error);
            }
        }
        else {
            toastr.error('¡Todos los campos son obligatorios!');
        }

    }
    else {
        toastr.error('¡Por favor, seleccione la ubicación.!');
    }
}
    
    function closeModal() {
        document.getElementById('reportModal').style.display = 'none';
        document.getElementById('reportForm').reset();
        const fotoMascota = document.getElementById('fotoMascota');
        fotoMascota.src = '';  // Limpiar la ruta de la imagen
        fotoMascota.style.display = 'none';  // Ocultar la imagen

        resetFormAndMap();

    }

    async function obtenerDatosMascotas() {
        document.getElementById('reportModal').style.display = 'block'
        try {
            const response = await fetch('/mis-mascotas/mis-mascotas'); // Realizar la solicitud GET
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            const mascotas = await response.json(); // Procesar la respuesta a formato JSON

            // Obtener el elemento del menú desplegable
            const mascotasDropdown = document.getElementById('mascotasDropdown');
            mascotasDropdown.innerHTML = ''; // Limpiar cualquier opción previa

            // Llenar el dropdown con las mascotas
            mascotas.forEach(mascota => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.className = 'dropdown-item';
                a.href = '#';
                a.textContent = mascota.nombre; // Mostrar el nombre de la mascota
                a.onclick = function () {

                    mostrarMascotaSeleccionada(mascota); // Llamar función al seleccionar una mascota
                };
                li.appendChild(a);
                mascotasDropdown.appendChild(li);
            });
        } catch (error) {
            console.error('Hubo un problema con la solicitud:', error);
        }
    }

    // Función para mostrar la mascota seleccionada
    function mostrarMascotaSeleccionada(mascota) {
        document.getElementById('fotoMascota').style.display = 'block';
        document.getElementById('name').value = mascota.nombre; // Mostrar el nombre
        document.getElementById('fotoMascota').src = mascota.foto; // Mostrar la foto
        document.getElementById('mascotaId').value = mascota.mascota_id; 
    }
    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0'); // Obtiene el día y lo convierte a string
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Obtiene el mes (recuerda que es 0-indexado)
        const year = date.getFullYear(); // Obtiene el año

        return `${day}-${month}-${year}`; // Retorna la fecha en formato dd-mm-yyyy
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
                    placeName = prompt("Ingresa el nombre del lugar para tu ubicación:"); // Asignar nombre global
                    if (placeName) {
                        description = prompt("Ingresa una descripción para tu ubicación:"); // Asignar descripción global
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
            //console.log(locationData);
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
        // console.log(locationData);
    }

    function loadSavedLocations() {
        const locations = JSON.parse(localStorage.getItem('locations')) || [];
        locations.forEach(location => {
            const marker = L.marker([location.latitude, location.longitude]).addTo(manualMap);
            marker.bindPopup(location.name).openPopup();
        });
    }


