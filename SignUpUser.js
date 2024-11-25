// Create a ItemsController class
class SignUpUser {
    // Set up the items and currentId property in the contructor
    constructor(currentId = 0) {
        this.items = [];
        this.currentId = currentId;
    }

    // Create the addItem method
    
    agregarUsuario(name, middlename, lastname, datebirthday, phone, email, password,isVip, acceptTerms) {
        const user = {
            // Increment the currentId property
            name: name,
            middlename: middlename,
            lastname: lastname,
            datebirthday: datebirthday,
            phone: phone,
            email: email,
            password: password,
            isVip: isVip, //add
            acceptTerms:acceptTerms, //add
            id: this.currentId++,
        };
        
        // Push the item to the items property
        this.items.push(user);
    }
} // Function to show the alerts. Alerts clean up after a certain time
function showAlertErrorOne(type, message) {
    const alertContainer = document.getElementById('alertContainer');
    alertContainer.insertAdjacentHTML('beforeend', `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `);
    
    setTimeout(function() {
        alertContainer.innerHTML = '';
    }, 1500);
}
