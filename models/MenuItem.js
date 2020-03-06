const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for Entry
const MenuItemSchema = new Schema({
    name: {
        type: String
    },
    dishDetails: {
        type: String
    },
    imgSrc: {
        type: String
    },
    dishPrice: {
        type: String
    }
})

//create model for Entry
const MenuItem = mongoose.model('MenuItem', MenuItemSchema);

module.exports = MenuItem;