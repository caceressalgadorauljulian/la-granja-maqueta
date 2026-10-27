/* La Granja · maqueta: comportamientos mínimos (menú móvil, ver contraseña, validación simulada y detalle de venta) */
(function () {
  "use strict";
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var abierto = menu.classList.toggle("abierto");
      toggle.setAttribute("aria-expanded", abierto ? "true" : "false");
    });
  }

  var ojo = document.querySelector(".ojo");
  if (ojo) {
    ojo.addEventListener("click", function () {
      var campo = document.getElementById(ojo.getAttribute("aria-controls"));
      var oculto = campo.type === "password";
      campo.type = oculto ? "text" : "password";
      ojo.setAttribute("aria-pressed", oculto ? "true" : "false");
      ojo.setAttribute("aria-label", oculto ? "Ocultar contraseña" : "Mostrar contraseña");
    });
  }

  /* Registrar cliente: si hay datos inválidos se muestra la pantalla de errores (validación simulada) */
  var formCliente = document.getElementById("form-cliente");
  if (formCliente) {
    formCliente.addEventListener("submit", function (e) {
      var nombre = document.getElementById("nombre").value.trim();
      var documento = document.getElementById("documento").value.trim();
      var correo = document.getElementById("correo").value.trim();
      var correoMal = correo !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
      if (nombre === "" || documento === "" || correoMal) {
        e.preventDefault();
        window.location.href = "registrar-cliente-errores.html";
      }
    });
  }

  /* Registrar venta: disponible y precio según el producto, agregar y quitar productos, total */
  var tbody = document.getElementById("detalle");
  if (tbody) {
    var selector = document.getElementById("producto");
    var cantidad = document.getElementById("cantidad");
    var disp = document.getElementById("disponible");
    var precioTxt = document.getElementById("precio");
    var msg = document.getElementById("msg-venta");
    var total = document.getElementById("total");
    var fmt = function (n) { return "$" + n.toLocaleString("es-CO"); };

    var actualizarInfo = function () {
      var op = selector.options[selector.selectedIndex];
      disp.innerHTML = "Disponible: <strong>" + op.dataset.stock + " kg</strong>";
      precioTxt.textContent = "Precio: " + fmt(Number(op.dataset.precio)) + "/kg";
    };
    var recalcular = function () {
      var suma = 0;
      tbody.querySelectorAll("tr").forEach(function (tr) { suma += Number(tr.dataset.subtotal); });
      total.textContent = fmt(suma);
    };
    selector.addEventListener("change", actualizarInfo);
    actualizarInfo();

    document.getElementById("agregar").addEventListener("click", function () {
      var op = selector.options[selector.selectedIndex];
      var cant = parseInt(cantidad.value, 10);
      var stock = Number(op.dataset.stock);
      var precio = Number(op.dataset.precio);
      var nombre = op.value;
      msg.textContent = "";
      if (!cant || cant < 1) { msg.textContent = "Escribe una cantidad mayor que cero."; return; }
      var fila = tbody.querySelector('tr[data-producto="' + nombre + '"]');
      var previa = fila ? Number(fila.dataset.cantidad) : 0;
      if (previa + cant > stock) {
        msg.textContent = "Stock insuficiente: solo hay " + stock + " kg de " + nombre + (previa ? " y ya tienes " + previa + " kg en la venta." : ".");
        return;
      }
      var nueva = previa + cant;
      if (!fila) {
        fila = document.createElement("tr");
        fila.dataset.producto = nombre;
        tbody.appendChild(fila);
      }
      fila.dataset.cantidad = nueva;
      fila.dataset.subtotal = nueva * precio;
      fila.innerHTML = '<th scope="row">' + nombre + '</th>' +
        '<td class="num" data-label="Cantidad">' + nueva + ' kg</td>' +
        '<td class="num" data-label="Precio unitario">' + fmt(precio) + '</td>' +
        '<td class="num" data-label="Subtotal"><strong>' + fmt(nueva * precio) + '</strong></td>' +
        '<td data-label="Acciones"><button type="button" class="btn btn--peligro quitar" aria-label="Quitar ' + nombre + '">Quitar</button></td>';
      recalcular();
    });

    tbody.addEventListener("click", function (e) {
      var b = e.target.closest(".quitar");
      if (b) { b.closest("tr").remove(); recalcular(); }
    });
  }
})();
