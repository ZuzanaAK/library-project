// models/Book.model.js

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bookSchema = new Schema(
  {
    title: String,
    description: String,
    author: String,
    rating: Number
  },
  {
    timestamps: true
  }
);

module.exports = model('Book', bookSchema);
