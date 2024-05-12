


document.addEventListener("DOMContentLoaded", function () {
  fetch("../Components/navbar.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("navbar-placeholder").innerHTML = html;
      assignNavbarEvents(); // Asegurar que los eventos se asignen después de cargar el HTML
      checkLoginStatus(); // Verificar el estado de inicio de sesión después de cargar
    })
    .catch((error) => console.warn(error));

  fetch("../Components/footer.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("footer-placeholder").innerHTML = html;
    })
    .catch((error) => console.warn(error));
});

$(document).ready(function () {
  $("#reservationForm").submit(function (event) {
    event.preventDefault();
    var name = $("#name").val();
    var email = $("#email").val();
    var number = $("#number").val();
    var phone = $("#phone").val();
    var date = $("#date").val();
    var time = $("#time").val();

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      number.trim() === "" ||
      phone.trim() === "" ||
      date.trim() === "" ||
      time.trim() === ""
    ) {
      alert("Por favor, completa todos los campos.");
      return false;
    }

    // Validar el formato del correo electrónico
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, introduce un correo electrónico válido.");
      return false;
    }

    // Aquí puedes agregar el código para enviar el formulario si la validación es exitosa
    alert("Formulario enviado con éxito.");
    // Puedes agregar aquí el código para enviar el formulario mediante AJAX, por ejemplo
  });
});
