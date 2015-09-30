'use strict';

var mongoose = require('mongoose'),
    validator = require('validator'),
    Schema = mongoose.Schema;

/**
 * Thing Schema
 */
var ItemSchema = new Schema({
    description: String,
    image: String,
    name: String,
    price: Number,
    quantity: Number
});

/**
 * Validations
 */
//Price Validation=========================
ItemSchema.path('price').validate(function (num) {
    return num !== null && validator.isNumeric(num) && num >= 1;
}, 'Price is invalid number');

//Quantity Validation=========================
ItemSchema.path('quantity').validate(function (num) {
    return num !== null && validator.isNumeric(num);
}, 'Price is invalid number');


//Description Validation=========================

ItemSchema.path('description').validate(function (text) {
    return text !== null && !validator.isNull(text) && text.trim().length >= 1;
}, 'Description can not be blank');

//Name Validation==============================

ItemSchema.path('name').validate(function (text) {
    return text !== null && !validator.isNull(text) && text.trim().length >= 1;
}, 'Name can not be blank');

//Image Validation=========================

ItemSchema.path('image').validate(function (text) {
    return text !== null && !validator.isNull(text) && text.trim().length >= 1;
}, 'Image can not be blank');

mongoose.model('Item', ItemSchema);