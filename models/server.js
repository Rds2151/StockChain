const Restaurant = require("./Restaurant"); // Update the path to your Restaurant model

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

    createAccount = async (restaurantName, email, name, password) => {
        try {
            const restaurant = new Restaurant({
                RestaurantName: restaurantName,
                Email: email,
                Owner: name,
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
}

module.exports = Server;
