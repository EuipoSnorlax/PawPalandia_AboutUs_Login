const registrar = document.getElementById('submit');

registrar.addEventListener('click', () => {
    const clientName = document.getElementById('clientName').value;
    const petName = document.getElementById('petName').value;
    const breed = document.getElementById('breed').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const date = document.getElementById('date').value;
    const kindOfService = document.getElementById('kindOfService').value;
    const comment = document.getElementById('comment').value;
    const privacyPolicyAccepted = document.getElementById('privacyPolicyAccepted').value;

    // Crear mi objeto que interactúa con el backend
    const service = {
        clientName: clientName,
        petName: petName,
        breed: breed,
        email: email,
        phoneNumber: phoneNumber,
        date: date,
        kindOfService: kindOfService,
        comment: comment,
        privacyPolicyAccepted: privacyPolicyAccepted
    }

    // Comenzar con la llamada de la API (fetch, asynch-await, axios)
    const url = `http://localhost:8080/api/v1`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
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