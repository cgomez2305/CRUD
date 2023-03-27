function agregar() {
	// Obtener los valores ingresados en el formulario
	const nombre = document.getElementById("nombre").value;
	const email = document.getElementById("email").value;
	var telefono = document.getElementById("telefono").value;
	
	// Validar que se hayan ingresado todos los campos
	if(nombre == "" || email == "" || telefono == "") {
		alert("Debe ingresar todos los campos");
		return;
	}
	
	// Crear un objeto con los datos ingresados
	var registro = {
		nombre: nombre,
		email: email,
		telefono: telefono
	};
	
	// Obtener los registros guardados en el almacenamiento local
	var registros = JSON.parse(localStorage.getItem("registros")) || [];
	
	// Agregar el nuevo registro al arreglo de registros
	registros.push(registro);
	
	// Guardar los registros en el almacenamiento local
	localStorage.setItem("registros", JSON.stringify(registros));
	
// Limpiar el formulario
document.getElementById("nombre").value = "";
document.getElementById("email").value = "";
document.getElementById("telefono").value = "";

// Actualizar la tabla
mostrarRegistros();
}

function mostrarRegistros() {
	// Obtener los registros guardados en el almacenamiento local
	var registros = JSON.parse(localStorage.getItem("registros")) || [];
	
	// Obtener la referencia a la tabla
	var tabla = document.getElementById("tabla").getElementsByTagName("tbody")[0];
	
	// Limpiar la tabla
	tabla.innerHTML = "";
	
	// Recorrer los registros y agregarlos a la tabla
	for(var i = 0; i < registros.length; i++) {
		var registro = registros[i];
		
		var fila = tabla.insertRow();
		
		var celdaNombre = fila.insertCell(0);
		celdaNombre.innerHTML = registro.nombre;
		
		var celdaEmail = fila.insertCell(1);
		celdaEmail.innerHTML = registro.email;
		
		var celdaTelefono = fila.insertCell(2);
		celdaTelefono.innerHTML = registro.telefono;
		
		var celdaAcciones = fila.insertCell(3);
		celdaAcciones.innerHTML = '<button type="button" onclick="editarRegistro(' + i + ')">Editar</button> ' +
			'<button type="button" onclick="eliminarRegistro(' + i + ')">Eliminar</button>';
	}
}

function editarRegistro(indice) {
	// Obtener los registros guardados en el almacenamiento local
	var registros = JSON.parse(localStorage.getItem("registros")) || [];
	
	// Obtener el registro a editar
	var registro = registros[indice];
	
	// Mostrar los datos del registro en el formulario
	document.getElementById("nombre").value = registro.nombre;
	document.getElementById("email").value = registro.email;
	document.getElementById("telefono").value = registro.telefono;
	
	// Eliminar el registro del arreglo de registros
	registros.splice(indice, 1);
	
	// Guardar los registros actualizados en el almacenamiento local
	localStorage.setItem("registros", JSON.stringify(registros));
	
	// Actualizar la tabla
	mostrarRegistros();
}

function eliminarRegistro(indice) {
	// Obtener los registros guardados en el almacenamiento local
	var registros = JSON.parse(localStorage.getItem("registros")) || [];
	
	// Eliminar el registro del arreglo de registros
	registros.splice(indice, 1);
	
	// Guardar los registros actualizados en el almacenamiento local
	localStorage.setItem("registros", JSON.stringify(registros));
	
	// Actualizar la tabla
	mostrarRegistros();
}

// Mostrar los registros al cargar la página
mostrarRegistros();
