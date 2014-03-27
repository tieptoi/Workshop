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
  return validator.isNumeric(num) && num >= 1 && num !== null;
}, 'Price is invalid number');

//Quantity Validation=========================
ItemSchema.path('quantity').validate(function (num) {
  return validator.isNumeric(num) && num !== null;
}, 'Price is invalid number');


 //Description Validation=========================

ItemSchema.path('description').validate(function (text) {
  return text.length >= 1 && text !== null;
}, 'Description can not be blank');

 //Name Validation==============================

ItemSchema.path('name').validate(function (text) {
  return text.length >= 1 && text !== null;
}, 'Name can not be blank');

//Image Validation=========================

ItemSchema.path('image').validate(function (text) {
  return text.length >= 1 && text !== null;
}, 'Image can not be blank');

mongoose.model('Item', ItemSchema);
