const server = require("./server");
const bcrypt = require("bcrypt");
const sobj = new server();

exports.register = async (restaurantName, email, name, location, password) => {
    try {
        const result = await sobj.getEmail(email);

        if (result !== null)
            return {
                error: "Email is already associated with another account",
                hasError: true,
            };

        const hashpassword = bcrypt.hashSync(password, 10);

        await sobj.createAccount(
            restaurantName,
            email,
            name,
            location,
            hashpassword
        );
        return { message: "Account created successfully", hasError: false };
    } catch (err) {
        console.error("Unexpected error during account creation:", err);
        throw { error: "Unexpected error occurred", hasError: true };
    }
};

exports.fetchStock = async (email) => {
    try {
        const user = await sobj.getEmail(email);
        if (user === null) {
            throw new Error("Email is Not Found");
        }
        const result = await sobj.fetchStock(user);
        if (result.length === 0) {
            throw new Error("Data Not Found");
        }
        return result;
    } catch (error) {
        return error;
    }
};

exports.fetchAllStocks = async() => {
    try {
        const result = await sobj.fetchAllStocks();
        if (result.length === 0) {
            throw new Error("Data Not Found");
        }
        return {"result" : result, hasError:false};
    } catch (error) {
        return {"error":error,hasError:true};
    }
}

exports.requestStock = async (email, itemName, quantity) => {
    try {
        const user = await sobj.getEmail(email);
        if (user === null) {
            return { error: "Email is Not Found" };
        }

        const stock = await sobj.fetchSpecificStocks(user, itemName);

        if (!stock || stock.length === 0) {
            return {
                message: "Stock not found for the specified item"
            };
        }

        let totalIngredient = stock[0].ingredientNo + stock[0].requestIngredientNo;
        if (totalIngredient + parseInt(quantity) > 100) {
            return {
                message: "Requested Amount is exceeding the Max Amount\nAvailable: " + (100 - totalIngredient)
            };
        }

        const result = await sobj.addRequestedIngredient(
            user,
            itemName,
            quantity
        );

        if (result.hasError) {
            return { message: result.message };
        } else {
            return { message: "Request sent for '" + quantity + "' units of " + itemName };
        }
    } catch (err) {
        console.error("Unexpected error during account creation:", err);
        throw { message: "Failed to add requested ingredient." };
    }
};

exports.addIngredientData = async (email, itemName, quantity) => {
    if (quantity > 100)
        return { message: ["Quantity is exceeding the Max Amount(100)", true] };
    try {
        const user = await sobj.getEmail(email);
        if (user === null) return { message: ["Email is Not Found", true] };

        await sobj.addIngredient(user, itemName, quantity);
        return { message: ["Ingredient Added Successfully", false] };
    } catch (err) {
        throw err;
    }
};

exports.transferIngredient = async (selectedRows, quantity) => {
    try {
        senderId = selectedRows[0].RestaurantId;
        receiverId = selectedRows[1].RestaurantId;
        
        const result = await sobj.transferIngredient(senderId, receiverId, selectedRows[0].ingredientName, parseInt(quantity));

        return { message: result.message };

    } catch (err) {
        console.error("Unexpected error during account creation:", err);
        throw { message: "Failed to tranfer ingredient." };
    }
}