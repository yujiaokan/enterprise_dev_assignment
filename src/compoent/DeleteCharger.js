
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';

function DeleteCharger() {
    const navigate = useNavigate();

    const [chargerId, setChargerId] = useState('');
    const [isConfirming, setIsConfirming] = useState(false);
    const { id } = useParams(); 
    useEffect(()=>{
        setChargerId(id)
    }, [id])
    const handleChargerIdChange = (event) => {
      setChargerId(event.target.value);
    };
  
    const handleDeleteClick = () => {
      setIsConfirming(true);
    };
  
    const confirmDelete = async () => {
      try {
        const response = await axios.delete(`http://192.168.0.11:5000/api/v1/maps/elechargerbyid/${chargerId}`);
        if (response.status === 200) {
          alert('Home Charger successfully deleted');
          navigate('/');
          setChargerId('');
          setIsConfirming(false);
        }
      } catch (error) {
        alert('There was an error deleting the home charger');
        console.error('Delete error:', error);
      }
    };
  
    return (
      <div>
        {!isConfirming ? (
          <div style={styles.defaultStyle}>
            <label >Charger ID</label>
            <input
            style={styles.input}
              type="text"
              value={id}
              onChange={handleChargerIdChange}
            />
            <button style={styles.button}onClick={handleDeleteClick}>Delete</button>
          </div>
        ) : (
          <div>
            <p>Are you sure you want to delete the charger with ID: {chargerId}?</p>
            <button onClick={confirmDelete}>Confirm</button>
            <button onClick={() => setIsConfirming(false)}>Cancel</button>
          </div>
        )}
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
export default DeleteCharger
