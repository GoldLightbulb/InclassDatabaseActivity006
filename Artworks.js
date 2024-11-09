// MongoosePainting.js
const mongoose = require('mongoose');

const ArtworksSchema = new mongoose.Schema({
  AccessionNumber: String,
  ArtistID: Number,
  CopyrightText: String,
  Cost: Number,
  Description: String,
  Excerpt: String,
  FirstName: String,
  GalleryCity: String,
  GalleryCountry: String,
  GalleryID: Number,
  GalleryName: String,
  Height: Number,
  ImageFileName: String,
  JsonAnnotations: Object,
  LastName: String,
  Latitude: Number,
  Longitude: Number,
  MSRP: Number,
  Medium: String,
  MuseumLink: String,
  PaintingID: Number,
  ShapeID: Number,
  ShapeName: String,
  Title: String,
  Width: Number,
  WikiLink: String,
  YearOfWork: Number
});

module.exports = mongoose.model('artworks', ArtworksSchema);
