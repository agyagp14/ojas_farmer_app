import React , {useState} from 'react';
import axios  from 'axios';
import './FarmerDetails.css';

const FarmerDetails = () => {

    const[farmerName, setFarmerName]= useState('');
    const[contactNumber, setContactNumber]= useState('');
    const[farmerImage, setFarmerImage]=useState(null);
    const[cropDetails, setcropDetails]=useState([{cropName: '', cropArea: '', sprayProducts:''}]);

    const handleUpdate=(index, field, value)=>{
        const updateCrops=[...cropDetails];
        updateCrops[index][field]= value;
        setcropDetails(updateCrops);
    }
    const  handleAdd=()=>{
        setcropDetails([...cropDetails, {cropName: '', cropArea: '', sprayProducts:''}])
    };

const handleSubmit= async(e)=>{
e.preventDefault();


const formData= new FormData();
formData.append('farmerName', farmerName);
formData.append('contactNumber', contactNumber);
formData.append('farmerImage', farmerImage)
formData.append('cropDetails', JSON.stringify(cropDetails));

try{
    await axios.post('api/upload', formData,{
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    });
    setFarmerName('');
    setContactNumber('');
    setFarmerImage(null);
    setcropDetails([{ cropName:'', cropArea:'', sprayProducts:''}]);
    alert('Uploaded successfully');
} catch(error){
    alert('Error');
}
}
  return (
    <div>
      <h1> Farmer Details Form</h1>
      <form onSubmit={handleSubmit} className="farmer-form">
      <div className="form-field">
        <label htmlFor='farmerName'>Farmer Name:</label>
        <input type='text' id='farmerName' value={farmerName} onChange={(e) => setFarmerName(e.target.value)} required />
        </div>
        <div className="form-field">
        <label htmlFor='contactNumber'>Contact Number:</label>
        <input type='tel' id='contactNumber' value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required/>
        </div>
        <div className="form-field">
        <label htmlFor='farmerImage'> Farmer Image</label>
        <input type='file' id='farmerImage' accept="image/*"  onChange={(e) => setFarmerImage(e.target.files[0])} required />
</div>
        <div id='cropDetails'>
            <label>Farmer Crop Details:</label>
            {cropDetails.map((crop, index)=>(
                <div className="crop-card" key={index}>
                    <input type='text' placeholder='crop name' value={crop.cropName} onChange={(e) => handleUpdate(index, 'cropName', e.target.value)} required/>
                    <input type='text' placeholder='crop area' value={crop.cropArea} onChange={(e) => handleUpdate(index, 'cropArea', e.target.value)} required />
                    <input type='text' placeholder='spray products' value={crop.sprayProducts} onChange={(e) => handleUpdate(index, 'sprayProducts', e.target.value)} required/>
                    </div>
            ))}
            <button type="button" onClick={handleAdd}>Add Crop</button>
            </div>   
            <button type="submit">Submit</button>

      </form>
    </div>
  )
}

export default FarmerDetails
