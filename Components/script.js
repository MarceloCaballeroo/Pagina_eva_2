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


  function cargarImagenesAleatorias() {
    // Realizar una solicitud para obtener una comida aleatoria
    $.get("https://www.themealdb.com/api/json/v1/1/random.php", function(data) {
        var meal = data.meals[0];
        if (meal) {
            // Asignar la URL de la imagen de la comida a cada una de las imágenes en la tarjeta
            $("#promocion .card-img").eq(0).attr("src", meal.strMealThumb);
        } else {
            // Si no se puede obtener una comida, mostrar un mensaje de error
            $("#promocion .card-text").html("Error al cargar la comida.");
        }
    });

    // Repetir el proceso para las otras dos imágenes
    $.get("https://www.themealdb.com/api/json/v1/1/random.php", function(data) {
        var meal = data.meals[0];
        if (meal) {
            $("#promocion .card-img").eq(1).attr("src", meal.strMealThumb);
        } else {
            $("#promocion .card-text").html("Error al cargar la comida.");
        }
    });

    $.get("https://www.themealdb.com/api/json/v1/1/random.php", function(data) {
        var meal = data.meals[0];
        if (meal) {
            $("#promocion .card-img").eq(2).attr("src", meal.strMealThumb);
        } else {
            $("#promocion .card-text").html("Error al cargar la comida.");
        }
    });

    // Cargar imágenes aleatorias para las tarjetas pequeñas
    $(".card").each(function(index) {
        var tarjeta = $(this);
        $.get("https://www.themealdb.com/api/json/v1/1/random.php", function(data) {
            var meal = data.meals[0];
            if (meal) {
                tarjeta.find(".card-img-top").attr("src", meal.strMealThumb);       
            } else {
                tarjeta.find(".card-text").html("Error al cargar la comida.");
            }
        });
    });
}

// Llamar a la función para cargar las imágenes aleatorias
cargarImagenesAleatorias();


$(document).ready(function () {
  var currentPage = 1;
  var categoriesPerPage = 5; // Número de categorías por página
  var categories = []; // Array para almacenar las categorías

  // Función para mostrar categorías según la página actual
  function showCategories(page) {
      // Ocultar todas las categorías
      $('.categoria').hide();
      // Mostrar las categorías de la página actual
      for (var i = (page - 1) * categoriesPerPage; i < page * categoriesPerPage; i++) {
          $('.categoria').eq(i).show();
      }
  }

  // Manejar clic en los enlaces de paginación
  $('.pagination a').on('click', function (e) {
      e.preventDefault();
      var page = parseInt($(this).attr('data-page'));
      if (!isNaN(page)) {
          currentPage = page;
          showCategories(currentPage);
      }
  });

  // Mostrar categorías al inicio
  showCategories(currentPage);

  // Manejar clic en el botón "Previous"
  $('#previousPage').on('click', function () {
      if (currentPage > 1) {
          currentPage--;
          showCategories(currentPage);
      }
  });

  // Manejar clic en el botón "Next"
  $('#nextPage').on('click', function () {
      if (currentPage < $('.page-item').length - 2) {
          currentPage++;
          showCategories(currentPage);
      }
  });

  // Petición GET a la API para obtener las categorías de comida
  $.get("https://www.themealdb.com/api/json/v1/1/categories.php", function (data) {
      // Almacenar las categorías en el array
      categories = data.categories;

      // Iterar sobre las categorías obtenidas
      $.each(categories, function (i, item) {
          // Agregar una nueva tarjeta por cada categoría
          $("#categorias").append(
              '<div class="col-md-5 mb-4 categoria" style="display:none;">' +
              '<div class="card" style="background-color:#FCD1A0 ;">' +
              '<img src="' + item.strCategoryThumb + '" class="card-img-top" alt="...">' +
              '<div class="card-body">' +
              '<h5 class="card-title">' + item.strCategory + '</h5>' +
              '<div class="descripcion-categoria" style="display:none;">' + item.strCategoryDescription + '</div>' +
              '<br>' +
              '<a href="#" class="btn btn-primary btn-ver-mas" style="background-color:#E74C3C ;">Ver más</a>' +
              '</div>' +
              '</div>' +
              '</div>'
          );
      });

      // Mostrar las primeras categorías al cargar la página
      showCategories(currentPage);
  });

  // Función para manejar el clic en el botón "Ver más"
  $(document).on('click', '.btn-ver-mas', function (e) {
      e.preventDefault(); // Evitar que la página se desplace al inicio
      // Encontrar la descripción dentro del contenedor de la tarjeta
      var descripcion = $(this).closest('.card').find('.descripcion-categoria');
      // Alternar la visibilidad de la descripción
      descripcion.toggle();
  });
});