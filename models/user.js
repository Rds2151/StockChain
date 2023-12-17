const server = require("./server");
const bcrypt = require("bcrypt")
const sobj = new server();

exports.register = async (restaurantName, email, name, password) => {
    try {
        const result = await sobj.getEmail(email);

        if (result !== null) return { error: "Email is already associated with another account.", hasError: true };

        const hashpassword = bcrypt.hashSync(password,10)

        await sobj.createAccount(restaurantName, email, name, hashpassword);
        return { message: "Account created successfully.", hasError: false };
    } 
    catch (err) {
        console.error("Unexpected error during account creation:", err);
        throw { error: "Unexpected error occurred.", hasError: true };
    }
};
