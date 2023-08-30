const mongoose= require('mongoose');
 const  farmerSchema= new mongoose.Schema({
    farmerName: String,
    contactNumber: String,
    farmerImage: String,
    cropDetails: [{cropName: String, cropArea: String, sprayProducts:String}],
 });


 module.exports = mongoose.model('Farmer', farmerSchema);