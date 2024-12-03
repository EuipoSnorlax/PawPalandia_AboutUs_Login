const mostrarServicio = document.getElementById('submit');

mostrarInfo.addEventListener('click', () => {
    const correoElectronico = document.getElementById('email').value;
    const url = `http://localhost:8080/api/v5/services/email/${correoElectronico}`;

    // fetch para método get
    fetch(url)
        .then(response => response.json())
        .then(data => {
            userInfo.innerHTML = `
                <h3>Información de tu cita:</h3>
                <br>
                <p>Mascota: ${data.username}</p
                <p>Nombre de usuario: ${data.username}</p>
                <p>Servicio: ${data.username}</p>
                <br>
                <p class="header-logo">Para cambios o cancelaciones, comunícate al  <span>800 220 7735</span></p>
            `
        })
        .catch(error => {
            userInfo.innerHTML = `
                No hay citas registradas a este correo.
            `
            console.error(error)
        })
})