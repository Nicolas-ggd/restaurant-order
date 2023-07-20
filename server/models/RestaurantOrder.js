const mongoose = require('mongoose');

const RestaurantOrder = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        items:[
            {
                orderName: {
                    type: String,
                    required: true
                },
                orderTime: {
                    type: Number,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                },
            }
        ],
        totalAmount: {
            tpye: Number,
            required: true
        },
        status: []
    },
    {
        timestamps: true
    }
)

const Order = mongoose.Schema("Order", RestaurantOrder);

module.exports = Order;