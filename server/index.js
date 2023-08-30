const express= require('express');
const mongoose= require('mongoose');
const Farmer= require('./models/farmer');


const app=express();
const PORT = process.env.PORT || 5000;


mongoose.connect('mongodb+srv://agyagp14:agya1403@cluster0.arpjb5c.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());

app.post('/api/upload', async(req, res)=>{
    try{
const Data= req.body;
const farmer= new  Farmer({
    farmerName: Data.farmerName,
    contactNumber: Data.contactNumber,
    farmerImage: Data.farmerImage,
    cropDetails: Data.cropDetails.map(  crop=>({
        cropName: crop.cropName,
        cropArea: crop.cropArea,
        sprayProducts: crop.sprayProducts,
    }))
})
 await farmer.save();   
console.log({message: "success"});
    }catch{
res.status(500).json({error:"error"})
    }
})

app.get('/api/details', async(req, res)=>{
    try{
       const details= await Farmer.find();
res.status(200).json(details);
    } catch{
res.status(500).json({error : 'error'})
    }
})


app.listen(PORT,()=>{
    console.log(`running ${PORT}`);
})