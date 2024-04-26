import React, { useState ,useEffect} from 'react';
import axios from 'axios';

function SavedCharger() {
    const [savedResults, setResults] = useState([]);
    const handlecharger = async () => {
        try {
          const response = await axios.get("http://192.168.0.11:5000/api/v1/savedcharger/savedetails");
          setResults(response.data); 
        } catch (error) {
          console.error('Search failed:', error);
        }
      };
      useEffect(() => {
        handlecharger();
      }, []); 
      
  return (
    <div style={styles.defaultStyle}>
      <h1 style={{ alignSelf: 'center', fontSize: 25, fontStyle: 'normal', color: '#87A922', fontWeight: 'bold' }}>
          Saved Home Charger Results
      </h1>
      <div>
        {savedResults.length > 0 ? (
          savedResults.map((charger) => (
            <div key={charger.id}>
              <h3>{charger.address+" "+charger.city+" "+charger.eircode}</h3>
              <p>{"charger types"+charger.chargertypes+" availible Time "+charger.availbleTime}</p>
           
            </div>
          ))
        ) : (
          <p>No Saved Home charger found</p>
        )}
      </div>
    </div>
  )
}
const styles = {
    defaultStyle: {
        width: "600px",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        margin: "auto",
        textAlign: "center",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '10px',
        width: '100%', 
      },
      label: {
        textAlign: 'left', 
        marginBottom: '5px', 
      },
      input: {
        padding: '10px',
        margin: '0',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '100%', 
      },
      select: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginBottom: '10px', 
        width: '100%', 
      },
      button: {
        padding: "10px",
        backgroundColor: "#87A922", 
        color: "white",
        border: "none",
        borderradius: "5px",
        cursor: "pointer", 
      }
  
}
  


export default SavedCharger
