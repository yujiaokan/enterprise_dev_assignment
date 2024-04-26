import React, { useState } from 'react';
import axios from 'axios';

function SearchHomeChargers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://192.168.0.11:5000/api/v1/maps/home-chargers?query=${searchQuery}`);
      setSearchResults(response.data); 
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div style={styles.defaultStyle}>
      <input
      style={styles.input}
        type="text"
        placeholder="Search home chargers by address/ eircode/ areas..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button style={styles.button}onClick={handleSearch}>Search</button>
      <div>
        {searchResults.length > 0 ? (
          searchResults.map((charger) => (
            <div key={charger.id}>
              <h3>{charger.address + " "+ charger.eircode}</h3>
              <p>{charger.phone + " Available Time "+charger.availbleTime }</p>
           
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

const styles = {
    defaultStyle: {
      
    
        padding: "20px",
        margin: "200px",
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
        alignself: 'center', 
        marginBottom: '5px', 
      },
      input: {
        padding: '10px',
        margin: '0',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '30%', 
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
        borderradius: "5px",
        cursor: "pointer", 
        margin:"20px"
      }
  
}

export default SearchHomeChargers;
