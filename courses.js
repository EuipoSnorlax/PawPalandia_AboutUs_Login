const cardData = [

    {
        "id": 1,
        "name": "Collar Ajustable para Perros",
        "price": 15.99,
        "description": "Collar resistente y ajustable, disponible en varios colores.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJzG-aoxw13npDwOYM1BxWEHwwxVSzZ1gyDQ&s",
        "category": "Accesorios",
        "stock": 25
    },
    {
        "id": 2,
        "name": "Comida Premium para Gatos",
        "price": 24.99,
        "description": "Bolsa de 2 kg de alimento balanceado para gatos adultos.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDh6ifXyVLgOCnwwmLJQ5EznUPMyCXmz41WA&s",
        "category": "Alimentos",
        "stock": 50
    },
    {
        "id": 3,
        "name": "Juguete Interactivo para Mascotas",
        "price": 10.49,
        "description": "Pelota interactiva para mantener entretenidas a tus mascotas.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeh4xKd_t00GI0Rd_pWytqY4hS-J7QM_UZK14A0z6Yv_wyA96NJ_VElQTNxgcXfyh7ZRA&usqp=CAU",
        "category": "Juguetes",
        "stock": 40
    },
    {
        "id": 4,
        "name": "Cama para Perros Grandes",
        "price": 45.99,
        "description": "Cama cómoda y resistente, perfecta para razas grandes.",
        "image": "https://m.media-amazon.com/images/I/71g+X2Sbf2L.jpg",
        "category": "Mobiliario",
        "stock": 10
    },
    {
        "id": 5,
        "name": "Rascador para Gatos",
        "price": 29.99,
        "description": "Rascador con diseño compacto y materiales duraderos.",
        "image": "https://m.media-amazon.com/images/I/71GR4c0VZ9S._AC_UF1000,1000_QL80_.jpg",
        "category": "Accesorios",
        "stock": 20
    },
    {
        "id": 6,
        "name": "Rascador para Gatos",
        "price": 29.99,
        "description": "Rascador con diseño compacto y materiales duraderos.",
        "image": "https://m.media-amazon.com/images/I/71GR4c0VZ9S._AC_UF1000,1000_QL80_.jpg",
        "category": "Accesorios",
        "stock": 20
    }
    
]




const container = document.querySelector('.card-container');



cardData.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
    <img src="${item.image}" alt="${item.name}" class="card-img">
    <div class="card-body">
      <h5 class="card-title" id = 'name'>${item.name}</h5>
      <p class="card-text">${item.description}</p>
      <p id='price'><strong>Precio:</strong> $${item.price}</p>
      <button id="btn-cart-plus" onclick="addToCart(${item.id}, '${item.name}', '${item.image}', ${item.price})" class="btn btn-outline-warning" type="button" data-bs-toggle="modal" data-bs-target="#modalProduct"><i class="fa-solid fa-cart-plus" style="color: #000000;"></i></button>
       <div class="card-rating">
      <span class="average-rating">(4.5)</span>
      <span class="average-stars">
            <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
            <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
            <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
            <i class="fa-solid fa-star" style="color: #FFD43B;"></i>     
           <i class="fa-solid fa-star-half" style="color: #FFD43B;"></i>
           <span class="card-reviews">(230)</span>
      </span>
      </div>
    </div>
  `;
    container.appendChild(card);
});






// Array para almacenar los productos en el carrito
let cart = [];

// Función para agregar productos al carrito
function addToCart(id, name, image, price) {
    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        // Si ya existe, solo aumentar la cantidad
        existingProduct.quantity += 1;
    } else {
        // Si no existe, agregarlo como nuevo producto
        cart.push({ id, name, image, price, quantity: 1 });
    }

    // Actualizar el carrito visualmente
    updateCart();
}

function decreaseProduct(id) {
    const menosProductos = cart.find(item => item.id === id);
    if (menosProductos) {
        if (menosProductos.quantity > 1) {
            menosProductos.quantity -= 1;
        } else {
            const index = cart.indexOf(menosProductos);
            cart.splice(index, 1);
        }
        
    }

    updateCart();
}


// Función para eliminar un producto del carrito
function removeFromCart(id) {
    // Eliminar producto del carrito
    cart = cart.filter(item => item.id !== id);

    // Actualizar el carrito visualmente
    updateCart();
}

// Función para vaciar el carrito
function clearCart() {
    cart = [];
    updateCart();
}

// Función para actualizar el contenido del carrito
function updateCart() {
    
    const cartItemsDiv = document.getElementById('cart-items');
    const totalPriceSpan = document.getElementById('total-price');

    // Limpiar el contenido actual del carrito
    cartItemsDiv.innerHTML = '';

    // Variables para calcular el total
    let total = 0;

    // Mostrar productos en el carrito
    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <h4>${item.name}</h4>
            <img src="${item.image}" style="width: 100px; height: 100px;">
            <p>Cantidad: ${item.quantity}</p>
            <p>Precio: $${item.price * item.quantity}</p>
            <button onclick="removeFromCart(${item.id})" class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></button>
            <button onclick="addToCart(${item.id}, '${item.name}', '${item.image}', ${item.price})" class="btn btn-outline-primary">Añadir piezas</button>
           <button onclick="decreaseProduct(${item.id})" class="btn btn-outline-warning">ELiminar piezas</button> 
        `;
        cartItemsDiv.appendChild(cartItemDiv);

        // Sumar al total
        total += item.price * item.quantity;
    });

    // Actualizar el precio total
    totalPriceSpan.textContent = total;
}



