(function () {
  const inputNumero = document.getElementById("contenido_inputnumero");

  const numeroAleatorio = Math.floor(Math.random() * 1000 + 1);

  const botonAdivinar = document.getElementsByClassName(
    "contenido_botones_boton"
  )[0];

  const botonResetear = document.getElementsByClassName(
    "contenido_botones_boton"
  )[1];

  let numeroIntentos = 5;

  console.log(numeroAleatorio);

  const numeroIntentosDisplay = document.getElementById(
    "numerointentosDisplay"
  );

  const numeroVecesPorcentajeDisplay = document.getElementById(
    "numerovecesnumeroaleatorio"
  );

  inputNumero.addEventListener("input", (e) => {
    const valor = e.target.value;
    if (valor != "") {
      if (valor < 0) {
        e.target.value = "";
      } else if (valor >= 0) {
        e.target.value = Math.round(valor);
      }

      if (valor > 1000) {
        e.target.value = 1000;
      }
      if (e.target.value == 0) {
        e.target.value = "";
      }
    }
  });

  botonAdivinar.addEventListener("click", () => {
    if (inputNumero.value == "") {
      Swal.fire({
        icon: "warning",
        title: "Debes ingresar un número.",
        text: "El input del número esta vacío. Ingresa un número",
      });
    } else {
      if (inputNumero.value == numeroAleatorio) {
        Swal.fire({
          title: "Has adivinado el número",
          text: `El número adivinado es el: ${numeroAleatorio}`,
          imageUrl: "../img/minions.gif", // URL de la imagen
          imageAlt: "Success", // Texto alternativo de la imagen
          showCancelButton: false, // Sin botón de cancelar
          confirmButtonText: "OK", // Texto del botón OK
          confirmButtonColor: "#4CAF50", // Color verde para el botón OK
        });
        numeroIntentos = 5;

        numeroIntentosDisplay.innerHTML = numeroIntentos;
        numeroVecesPorcentajeDisplay.innerHTML = "0%";
      } else if (inputNumero.value < numeroAleatorio) {
        calcularPorcentajeIntento(+inputNumero.value, numeroAleatorio);
        Swal.fire({
          icon: "error",
          title: "No has adivinado el número",
          text:
            "El número aleatorio es mayor al número que has ingresado" +
            " " +
            inputNumero.value,
        }).then(() => {
          disminuirIntentos();
        });
      } else if (inputNumero.value > numeroAleatorio) {
        calcularPorcentajeIntento(+inputNumero.value, numeroAleatorio);
        Swal.fire({
          icon: "error",
          title: "No has adivinado el número",
          text:
            "El número aleatorio es menor al número que has ingresado" +
            " " +
            inputNumero.value,
        }).then(() => {
          disminuirIntentos();
        });
      }
    }
  });

  function verificarIntentos(numeroIntentos) {
    if (numeroIntentos == 0) {
      inputNumero.readOnly = true;
      botonAdivinar.disabled = true;
    }
  }

  function resetearEstados() {
    numeroIntentos = 5;
    inputNumero.readOnly = false;
    botonAdivinar.disabled = false;
    numeroIntentosDisplay.innerHTML = numeroIntentos;
    numeroVecesPorcentajeDisplay.innerHTML = "100%";
    inputNumero.value = "";
  }

  function disminuirIntentos() {
    numeroIntentos--;
    numeroIntentosDisplay.innerHTML = numeroIntentos;
    Swal.fire({
      icon: "warning",
      title: "Te quedan menos intentos.",
      text: `Te quedan ${numeroIntentos} intentos`,
    });
    verificarIntentos(numeroIntentos);
  }

  botonResetear.addEventListener("click", () => {
    resetearEstados();
  });

  function calcularPorcentajeIntento(valorIngresado, numeroAleatorio) {
    const porcentajeAcierto =
      ((Math.abs(valorIngresado - numeroAleatorio) / 1000) * 100).toFixed(2) +
      " %";
    numeroVecesPorcentajeDisplay.innerHTML = porcentajeAcierto;
  }
})();
