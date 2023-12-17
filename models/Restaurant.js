const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    CurrentStock: {
        ingredientNo: {
            type: Number,
            default: 0,
        }
    }
});

restaurantSchema.methods.addIngredient = (ingredientName,quantity) => {
    if (!this.currentStock.hasOwnProperty(ingredientName)){
        this.currentStock[ingredientName] = {
            type : Number,
            default : quantity || 0
        };
    }
};

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant;
