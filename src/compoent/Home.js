import React,{ useState, useEffect } from 'react';
import { GoogleMap, useLoadScript ,Marker,InfoWindow  } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Button } from '@mui/material';
const containerStyle = {
  width: '100%',
  height: '1000px',
  marginTop: 100
};

const center = {
    lat: 53.325529,
    lng: -6.501184,
    latitudeDelta: 0.3,
    longitudeDelta: 0.5,
};

function MyComponent() {
    const navigate = useNavigate();

    const [allListings, setAllListings] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    async function GetAllListings() {
        try {
 
            const response=await axios.get("http://192.168.0.11:5000/api/v1/maps/details")
              console.log(response.data);
            
                setAllListings(response.data);
        } catch (error) {
            
                console.log('Request canceled', error.message);
           
        }
    }

    useEffect(() => {
        GetAllListings();
      }, []); 
      

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyDta8ntoPlgewpunXtw8SA4jXMUdfxZ9UE",
        libraries: ["places"], // Add libraries if needed
      });
      if (loadError) {
        return <div>Error loading maps</div>;
      }
    
      if (!isLoaded) {
        return <div>Loading...</div>;
      }
	
	
    
    
  const onMarkerClick = (item) => {
    setSelectedPlace(item);
  };
  const savedCharger = async () => {
  
    try {

      const chargerData = {
        chargerId: selectedPlace.id,
        address:selectedPlace.address,
        city:selectedPlace.city,
        eircode: selectedPlace.eircode,
        chargertypes:selectedPlace.chargertypes,
        availbleTime:selectedPlace.availbleTime,
      };


        //http://192.168.0.11
      const response = await axios.post('http://192.168.0.11:5000/api/v1/savedcharger/charger',chargerData,{
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const result = response.data;
      console.log(result);
  
      if (response.status===200) {
        // Handle success
        alert('home Charger saved');
        navigate('/');
        console.log('Charger added  successfully', result);
      } else {
        // Handle errors
        console.error('Failed to add charger:', result);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  return (
    
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
         {allListings.map(item => (
          <Marker
            key={item.id}
            position={{ lat: item.coordinate.latitude, lng: item.coordinate.longitude }}
            // Optional: if you want to show some information on click
            onClick={() =>onMarkerClick(item)}
          />
        ))}
        {selectedPlace && (
          <InfoWindow
            position={{
              lat: selectedPlace.coordinate.latitude,
              lng: selectedPlace.coordinate.longitude
            }}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div>
              <h2>{selectedPlace.name}</h2>
              <p>{selectedPlace.address+" "+selectedPlace.eircode}</p>
              <p>{selectedPlace.chargertypes}</p>
              <p>{"avaliable time: "+selectedPlace.availbleTime}</p>
              <p>{selectedPlace.description}</p>
              <img src={selectedPlace.image} alt="Uploaded" style={{ width: '200px', height: 'auto' }} />
            <Button onClick={()=>navigate(`/updatedetail/${selectedPlace.id}`)}> Edit</Button>
            <Button onClick={()=>navigate(`/deletecharger/${selectedPlace.id}`)}> Delete</Button>
            <Button onClick={()=>savedCharger()}> Save</Button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
   
  );
}

export default MyComponent;
