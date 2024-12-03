const registrar = document.getElementById('submit');

registrar.addEventListener('click', () => {
    const correoElectronico = document.getElementById('email').value;

    // Crear mi objeto que interactúa con el backend
    const newsletter = {
        email: correoElectronico,
    }

    // Comenzar con la llamada de la API (fetch, asynch-await, axios)
    const url = `http://localhost:8080/api/v1`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newsletter)
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log('Guardado', data)
        })
        .catch(error => {
            console.error(error);
        })

})