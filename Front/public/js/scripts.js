

document.addEventListener('DOMContentLoaded', function() {
    setActiveNavLink();
    
    initializeNavbar();
    //updateReports();
    //startWebSocket(); 
   
});
function initializeNavbar() {
    const nav = document.querySelector("#nav");
    const abrir = document.querySelector("#abrir");
    const cerrar = document.querySelector("#cerrar");

    abrir.addEventListener("click", () => {
        nav.classList.add("visible");
    });

    cerrar.addEventListener("click", () => {
        nav.classList.remove("visible");
    });
}


function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-list a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}



// function startWebSocket() {
//     ws = new WebSocket('ws://localhost:8080');
//     ws.onmessage = function(event) {
//         const newReports = JSON.parse(event.data);

//         newReports.forEach(report => {
//             const reportExists = reports.find(r => r.id === report.id);
//             if (!reportExists) {
//                 reports.push(report); // Agregar cada reporte nuevo si no está ya presente
//             }
//         });

//         updateReports();
//     };
// }

// function addReport(event) {
//     event.preventDefault();
    
//     const formData = new FormData(document.getElementById('reportForm'));

//     fetch('/addReport', {
//         method: 'POST',
//         body: formData
//     }).then(response => response.json())
//       .then(data => {
//         document.getElementById('reportForm').reset();
//         document.getElementById('imagePreview').src = '';
//         closeModal();
//       }).catch(error => console.error('Error:', error));
// }


