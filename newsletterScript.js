const suscribir = document.getElementById('button-addon2');

suscribir.addEventListener('click', () => {
    const email = document.getElementById('emailInputN').value;

    // Crear objeto para enviar al backend
    const newsletter = {
        email: email,
    };
console.log(email);
    // Realizar la llamada a la API
    const url = `http://localhost:8080/api/v6/post-newsletter`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newsletter)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Guardado', data);
        })
        .catch(error => {
            console.error(error);
        });
});
