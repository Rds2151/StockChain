const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    currentStock: {
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
