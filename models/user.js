const server = require("./server");
const bcrypt = require("bcrypt")
const sobj = new server();

exports.register = async (restaurantName, email, name, location, password) => {
    try {
        const result = await sobj.getEmail(email);

        if (result !== null) return { error: "Email is already associated with another account", hasError: true };

        const hashpassword = bcrypt.hashSync(password,10)

        await sobj.createAccount(restaurantName, email, name, location, hashpassword);
        return { message: "Account created successfully", hasError: false };
    } 
    catch (err) {
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
        return error.message;
    }
};

exports.requestData = async (email, itemName, quantity) => {
    try {
        const user = await sobj.getEmail(email);
        if (user === null) return { error: "Email is Not Found", hasError: true };

        let result = await sobj.getData(user, itemName);

        return { message: "", hasError: false };
    } 
    catch (err) {
        console.error("Unexpected error during account creation:", err);
        throw { error: "Unexpected error occurred", hasError: true };
    }
}

exports.addIngredientData = async (email, itemName, quantity) => {
    if (quantity > 100) return {message : ["Quantity is exceeding the Max Amount(100)",true]}
    try {
        const user = await sobj.getEmail(email);
        if (user === null) return { message : ["Email is Not Found",true]};

        await sobj.addIngredient(user, itemName,quantity);
        return { message: ["Ingredient Added Successfully",false]};
    } 
    catch (err) {
        throw err;
    }
}

addIngredient = async (user,itemName,quantity) => {
    try {
        const storage = new Storage({
            RestaurantId: user._id,
            ingredientName:itemName,
            ingredientNo:quantity
        })

        const savedIngredient = await storage.save();
        return savedIngredient;
    } catch (error) {
        throw error;
    }
}