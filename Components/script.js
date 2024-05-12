$(document).ready(function () {
  function assignNavbarEvents() {
    $("#actionLogin")
      .off("click")
      .on("click", function (e) {
        e.preventDefault();
        login();
      });

    $("#actionLogout")
      .off("click")
      .on("click", function (e) {
        e.preventDefault();
        logout();
      });

    $("#actionRegister")
      .off("click")
      .on("click", function (e) {
        e.preventDefault();
        register();
      });
  }

  // Verifica el estado de inicio de sesión y ajusta la UI correspondientemente
  function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (isLoggedIn) {
      $("#actionLogin").hide();
      $("#actionLogout")
        .show()
        .text(isAdmin ? "Cerrar sesión (admin)" : "Cerrar sesión"); // Modificación aquí
      $("#actionRegister").hide();
    } else {
      $("#actionLogin").show();
      $("#actionLogout").hide().text("Cerrar sesión"); // Asegurar que el texto vuelva a la normalidad
      $("#actionRegister").show();
    }

    if (isAdmin) {
      // Opciones específicas del administrador
      console.log("El modo de administrador está activado.");
    }
  }

  // Cargar la navbar y luego aplicar la lógica de visibilidad
  $("#navbar-placeholder").load("navbar.html", function () {
    assignNavbarEvents();
    checkLoginStatus();
  });

  // Lógica de inicio de sesión
  function login() {
    const email = prompt("Ingrese su correo electrónico:");
    const password = prompt("Ingrese su contraseña:");

    // Simula la lógica de autenticación
    if (email === "admin" && password === "123") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("isAdmin", "true");
      alert("Inicio de sesión como Administrador exitoso.");
    } else if (email && password) {
      localStorage.setItem("isLoggedIn", "true");
      alert("Inicio de sesión exitoso.");
    } else {
      alert("Inicio de sesión fallido. Por favor, intente de nuevo.");
    }
    checkLoginStatus();
  }

  // Lógica de cierre de sesión
  function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    alert("Sesión cerrada exitosamente.");
    checkLoginStatus();
  }

  // Lógica de registro (ejemplo simplificado)
  function register() {
    const email = prompt("Ingrese su correo electrónico para registrarse:");
    // Aquí iría la lógica de registro, como guardar datos en localStorage o enviarlos a un servidor
    alert("Registro completado (simulado). Por favor, inicie sesión.");
  }
});


document.addEventListener("DOMContentLoaded", function() {
    fetch('../Components/navbar.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('navbar-placeholder').innerHTML = html;
    })
    .catch(error => console.warn(error));

    fetch('../Components/footer.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('footer-placeholder').innerHTML = html;
    })
    .catch(error => console.warn(error));
});

$(document).ready(function() {
  $('#reservationForm').submit(function(event) {
  event.preventDefault();
  var name = $('#name').val();
  var email = $('#email').val();
  var number = $('#number').val();
  var phone = $('#phone').val();
  var date = $('#date').val();
  var time = $('#time').val();

  if (name.trim() === '' || email.trim() === '' || number.trim() === '' || phone.trim() === '' || date.trim() === '' || time.trim() === '') {
      alert('Por favor, completa todos los campos.');
      return false;
  }

    // Validar el formato del correo electrónico
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      alert('Por favor, introduce un correo electrónico válido.');
      return false;
  }

    // Aquí puedes agregar el código para enviar el formulario si la validación es exitosa
  alert('Formulario enviado con éxito.');
    // Puedes agregar aquí el código para enviar el formulario mediante AJAX, por ejemplo
  });
});

//Abrir modal 
$(document).ready(function() {
  $('#myModal').modal('show');
});

