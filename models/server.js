const Restaurant = require("./Restaurant"); // Update the path to your Restaurant model
const Storage = require("./Storage"); // Update the path to your Restaurant model

class Server 
{
    getEmail = async (email) => {
        try {
            const restaurant = await Restaurant.findOne({ Email: email });
            return restaurant;
        } catch (error) {
            throw error;
        }
    };

    createAccount = async (restaurantName, email, name, loc, password) => {
        try {
            const restaurant = new Restaurant({
                RestaurantName: restaurantName,
                Email: email,
                Owner: name,
                location: loc,
                Password: password,
            });

            const savedRestaurant = await restaurant.save();
            return savedRestaurant;
        } catch (error) {
            throw error;
        }
    };

    getUserById = async (id) => {
        return await Restaurant.findOne({_id : id})
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

    fetchStock = async (user) => {
        try {
            return await Storage.find({ RestaurantId: user._id });
        } catch (error) {
            throw error;
        }
    };
    
}

module.exports = Server;
