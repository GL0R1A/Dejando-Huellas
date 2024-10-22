document.addEventListener('DOMContentLoaded', function() {
  const logoutLinks = document.querySelectorAll('.logout'); // Selecciona todos los elementos con la clase 'logout'
  
  logoutLinks.forEach(function(logoutLink) {
      logoutLink.addEventListener('click', function(event) {
          event.preventDefault();  // Evita el comportamiento predeterminado
          Swal.fire({
              title: 'Confirmar cierre de sesión',
              text: "¿Seguro que quieres cerrar sesión?",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Sí, cerrar sesión'
          }).then((result) => {
              if (result.isConfirmed) {
                  window.location.href = '/users/logout';  // Redirige al usuario
              }
          });
      });
  });
});