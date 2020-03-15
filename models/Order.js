const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for Entry
const OrderSchema = new Schema({
    customerName: {
        type: String
    },
    customerAddress: {
        type: String
    },
    orderId: {
        type: String
    },
    orderDetails: [{
        type: String
    }],
    customerEmail: {
        type: String
    },
    customerPhone: {
        type: String
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    orderStatus: {
        type: String
    }

})

//create model for Entry
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;