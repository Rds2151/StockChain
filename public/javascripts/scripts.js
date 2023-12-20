/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

function showForm(formId) {
    const forms = document.querySelectorAll('div[id$="Form"]');
    forms.forEach((form) => {
        form.style.display = "none";
    });

    document.getElementById(formId).style.display = "block";
}


function requestStock(itemName,items) {
    var quantity = prompt("How much of '" + itemName + "' do you need?");

    if (quantity !== null && !isNaN(quantity) && quantity.trim() !== "" ) {
        var totalQuantity = parseInt(quantity) + items;
        if (totalQuantity > 100) {
            alert("Quantity is exceeding the Max Amount\nAvailable: " + (100 - items));
        } else {
            fetch("http://localhost:3000/users/requestData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "itemName": itemName,
                    "quantity": quantity,
                })
            })
            .then(response => response.json())
            .then(data => alert("Request sent for '" + data + "' units of " + itemName))
            .catch(error => console.error("Error:", error));
        }
    } else {
        alert("Invalid input. Please enter a valid quantity.");
    }
}