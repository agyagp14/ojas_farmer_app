const mongoose = require('mongoose');

const cropSchema= new mongoose.Schema({
    cropName: String, 
    cropArea: String,
    sprayProducts: String,
});

module.exports = {
    CropSchema: mongoose.model('Crop', cropSchema), // Export it as a named export
    cropSchema, // Export it as a default export
};