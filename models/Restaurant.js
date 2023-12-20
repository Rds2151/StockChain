const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    RestaurantName: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique:true
    },
    Password: {
        type: String,
        required: true,
    },
    Owner: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
        default: "N/A"
    },
    role: {
        type: String,
        required: true,
        default: "user"
    }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant;
