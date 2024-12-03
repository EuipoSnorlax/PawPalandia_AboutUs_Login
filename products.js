// async function loadJSONData(callback) {
//     try {
//         const response = await fetch('./products.json');
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const productos = await response.json();
//         callback(productos);
//     } catch (error) {
//         console.error('Error loading JSON file:', error);
//         showAlertErrorOne('danger', 'No se pudieron cargar los productos. Intente más tarde.');
//     }
// }

//---(Inicio) Recolectar productos desde la base de datos---
async function loadJSONData(callback) {
    const url = `http://localhost:8080/api/v4/products`;

    try {
        // fetch para método GET
        const response = await fetch(url);
        
        // Verificar si la respuesta es exitosa (status 200-299)
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        
        const data = await response.json();  // Extraer los datos JSON

        // Llamar al callback con los datos obtenidos
        callback(data);
    } catch (error) {
        // Manejo de errores
        const userInfo = document.getElementById('userInfo'); // Asegúrate de tener un elemento con id 'userInfo'
        if (userInfo) {
            userInfo.innerHTML = `Error al cargar los datos: ${error.message}`;
        }
        console.error(error);
    }
}
//---(Final) Recolectar productos desde la base de datos---




// Render items as list-group-items within the #publicaciones-lista container
function renderizarPublicaciones(publicaciones) {
    const lista = document.getElementById('publicaciones-lista');
    lista.innerHTML = '';

    publicaciones.forEach(publicacion => {
        lista.innerHTML += `
             <div class="list-group-item" id="product-${publicacion.idProduct}">
                <img src="${publicacion.url}" alt="${publicacion.productName}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                <strong>${publicacion.productName}</strong>
                <p>${publicacion.description}</p>
                <button type="button" class="btn btn-theme" onclick="modificarProducto(${publicacion.idProduct})">Modificar</button>
                <button type="button" class="btn btn-theme" onclick="eliminarProducto(${publicacion.idProduct})">Eliminar</button>
            </div>
        `;
    });
}


// Run render function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadJSONData(renderizarPublicaciones);
});


function agregarProducto(id) {
    productToAddId = id;
    if (nuevoProducto.name && nuevoProducto.img && nuevoProducto.description) {
        productos.ListaProductos.push(nuevoProducto);
        console.log("El producto se agrego exitosamente ", nuevoProducto);
    } else {
        console.log("Error el nuevo producto debe tener un nombre, imagen y descripción.");
    }
};


let productToModify = null;

function modificarProducto(id) {
    productToModify = id;
    const modifyProductModal = new bootstrap.Modal(document.getElementById('modifyProduct'));
    modifyProductModal.show();

}

//Seleccionar opción dentro de "modificar producto para realizar cambios"

document.getElementById('fieldSelect').addEventListener('change', function() {
    const selectValue = this.value;
    const dynamicInput = document.getElementById('dynamicInput');
    dynamicInput.innerHTML = ''; 


    if(selectValue === 'code') {
        dynamicInput.innerHTML =
        `<label for="newCode">Código de Barras</label>
         <input type="text" class="form-control" id="newCode"  placeholder="Ingresa el nuevo Código de Barras">`
        
    } else if(selectValue === 'image') {
        dynamicInput.innerHTML =
        `<label for="newImageUrl">Link de imagen</label>
         <input type="text" class="form-control" id="newImageUrl" placeholder="Ingresa el nuevo link">`
         
    } else if(selectValue === 'description'){
        dynamicInput.innerHTML =
        `<label for="newDescription">Descripción</label>
         <textarea type="text" class="form-control" id="newDescription" placeholder="Ingresa la nueva descripción"></textarea>`
    }
});



let productToRemoveId = null;

function eliminarProducto(id) {
    productToRemoveId = id;
    const removeProductModal = new bootstrap.Modal(document.getElementById('removeProduct'));
    removeProductModal.show();
}


function eliminarTodo() {
    const lista = document.getElementById('publicaciones-lista');
    lista.innerHTML = '';
};


document.getElementById('confirmRemoveBtn').addEventListener('click', function () {
    const productElement = document.getElementById(`product-${productToRemoveId}`);
    if (productElement) {
        productElement.remove();
        console.log(`Producto con ID ${productToRemoveId} eliminado.`);
    } else {
        console.error(`Producto con el id ${productToRemoveId} no encontrado.`);
    }

    // Close modal con la opción cerrar
    const removeProductModal = bootstrap.Modal.getInstance(document.getElementById('removeProduct'));
    removeProductModal.hide();
});

function showAlertErrorOne(type, message) {
    const alertContainer = document.getElementById('alertContainer2');
    alertContainer.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
  }
  