    const mongoose = require("mongoose");

    const storageSchema = new mongoose.Schema({
        RestaurantId: {
            type: String,
            required: true,
        },
        ingredientName: {
            type: String,
            required: true
        },
        ingredientNo: {
            type: Number,
            default: 0,
        },
    });

    storageSchema.pre('save', async function (next) {
        try {
            const existingIngredient = await Storage.findOne({
                RestaurantId: this.RestaurantId,
                ingredientName: this.ingredientName
            });

            if (existingIngredient) {
                const error = new Error('Ingredient already exists for this restaurant');
                return next(error);
            }
            next();
        } catch (error) {
            next(error);
        }
    });

    const Storage = mongoose.model('Storage', storageSchema);

    module.exports = Storage;
