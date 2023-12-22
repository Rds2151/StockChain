/*!
 * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener("click", (event) => {
            event.preventDefault();
            document.body.classList.toggle("sb-sidenav-toggled");
            localStorage.setItem(
                "sb|sidebar-toggle",
                document.body.classList.contains("sb-sidenav-toggled")
            );
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

function requestStock(itemName, items) {
    var quantity = prompt("How much of '" + itemName + "' do you need?");

    if (quantity !== null && !isNaN(quantity) && quantity.trim() !== "") {
        var totalQuantity = parseInt(quantity) + items;
        if (totalQuantity > 100) {
            alert(
                "Quantity is exceeding the Max Amount\nAvailable: " +
                    (100 - items)
            );
        } else {
            fetch("http://localhost:3000/users/requestData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    itemName: itemName,
                    quantity: quantity,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! Status: ${response.status}`
                        );
                    }
                    return response.json();
                })
                .then((result) => {
                    alert(result.message);
                })
                .catch((error) => {
                    alert("Error: " + error.message);
                });
        }
    } else {
        alert("Invalid input. Please enter a valid quantity.");
    }
}

var selectedRows = [];

function selectRow(checkbox) {
    var ingredientName = checkbox.dataset.ingredientName;
    var ingredientNo = parseInt(checkbox.dataset.ingredientNo);
    var rowId = checkbox.dataset.rowId;
    var requestedIngredientNo = parseInt(
        checkbox.dataset.requestedIngredientNo
    );

    if (checkbox.checked) {
        // Check if there's already a selected row with different ingredient name or higher ingredient number
        var hasDifferentName = selectedRows.some(
            (row) => row.ingredientName !== ingredientName
        );
        var hasHigherIngredientNo = selectedRows.some(
            (row) => row.requestedIngredientNo >= requestedIngredientNo
        );

        // Apply the logic "Cannot select rows with Ingredient Number less than 15."
        if (selectedRows.length == 0) {
            if (ingredientNo < 15) {
                checkbox.checked = false;
                alert(
                    "Cannot select rows with Ingredient Number less than 15."
                );
                return;
            }
        } else {
            if (requestedIngredientNo <= 0) {
                checkbox.checked = false;
                alert("Requested Ingredient Number should be greater than zero.");
                return;
            }
        }

        if (selectedRows.length >= 2 || hasDifferentName) {
            checkbox.checked = false;
            alert("You can only select two rows with the same ingredient");
            return;
        }

        selectedRows.push({
            ingredientName: ingredientName,
            ingredientNo: ingredientNo,
            RestaurantId: rowId,
            requestedIngredientNo: requestedIngredientNo,
        });
    } else {
        selectedRows = selectedRows.filter(
            (row) =>
                row.ingredientName !== ingredientName ||
                row.ingredientNo !== ingredientNo
        );
    }
}

function transferSelectedRows() {
    if (selectedRows.length === 0) {
        alert("Please select exact two row to transfer.");
        return;
    }
    var quantity = prompt("How many '" + selectedRows[0].ingredientName + "' are you want to transfer?");
    console.log(quantity)

    if (parseInt(quantity) > selectedRows[1].requestedIngredientNo) {
        alert("Selected Transfer amount is exceeding the Requested Amount");
        return;
    }

    fetch("http://localhost:3000/users/transferIngredient", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "selectedRows": selectedRows, "quantity" :quantity }),
    })
    .then((response) => response.json())
    .then((data) => {
        // Assuming the data contains the URL to navigate to
        if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
        } else {
            console.error("Missing redirect URL in the response data.");
        }
    })
    .catch((error) => console.error("Error:", error));
}
