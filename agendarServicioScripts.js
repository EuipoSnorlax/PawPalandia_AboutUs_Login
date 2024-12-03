const registrar = document.getElementById('botonregistrarcita');

registrar.addEventListener('click', () => {
    const clientName = document.getElementById('clientName').value;
    const petName = document.getElementById('petName').value;
    const breed = document.getElementById('breed').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const dateStr = document.getElementById('date').value;
    const kindOfService = document.getElementById('kindOfService').value;
    const comment = document.getElementById('comment').value;
    const privacyPolicyAccepted = document.getElementById('privacyPolicyAccepted').checked;

    const newDate = new Date(dateStr);
    const formattedDate = newDate.toISOString().slice(0, 16);
    // Crear objeto para enviar al backend
    const service = {
        clientName: clientName,
        petName: petName,
        breed: breed,
        email: email,
        phoneNumber: phoneNumber,
        date: formattedDate,
        kindOfService: kindOfService,
        comment: comment,
        privacyPolicyAccepted: privacyPolicyAccepted
    };

    console.log(formattedDate);
    // Realizar la llamada a la API
    const url = `http://localhost:8080/api/v5/post-service`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(service)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Guardado', data);
        })
        .catch(error => {
            console.error(error);
        });
});
