import axios from 'axios';
import React,{ useState ,useEffect} from 'react'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from './firebase';
import { useParams,useNavigate } from 'react-router-dom';
  
const allTimes = [
    "5:00","5:30", "6:00", "6:30","7:00","7:30", "8:00", "8:30","9:00","9:30", "10:00","10:30", "11:00","11:30", "12:00", "12:30","13:00",
    "13:30","14:00","14:30", "15:00","15:30", "16:00", "16:30","17:00","17:30", "18:00", "18:30","19:00", "19:30","20:00", "20:30","21:00",
    "21:30","22:00","22:30", "23:00", "23:30","24:00"
  ];
function UpdateDetail() {
    const navigate = useNavigate();

    const [selectedStartTime, setselectedStartTime] = useState('');
    const [selectedEndTime, setselectedEndTime] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setuserEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [eircode, setEircode] = useState('');
    const [description, setDescription] = useState('');
    const [chargerID, setChargerID] = useState('');
    const { id } = useParams(); 
    const [imageSrc, setImageSrc] = useState('');

    console.log("update route is", id);
    const uploadImageToFirebase = async (uri) => {
      try {
       
        const imageRef = ref(storage, 'images/' + `myImage_${Date.now()}.jpg`);

        // Upload the file
        await uploadBytes(imageRef, uri);
    
        // Get the download URL
        const url = await getDownloadURL(imageRef);
        console.log('Uploaded image URL:', url);
        setImageSrc(url);
        return url;
      } catch (error) {
        console.error('Error uploading image to Firebase Storage', error);
        return undefined;
      }
    };
  
    const [coordnate, setCoordnate] = useState( {curloc:{
        latitude:null, 
        longitude: null,
    
    }});

    async function geocodeAddress(address) {
        const GOOGLE_MAPS_API_KEY = 'AIzaSyDta8ntoPlgewpunXtw8SA4jXMUdfxZ9UE';
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;
      
        try {
          const response = await fetch(url);
          const data = await response.json();
      
          if (data.status === 'OK') {
            const { lat, lng } = data.results[0].geometry.location;
            const newCoordinate = {
                latitude: lat,
                longitude: lng,
            };
            setCoordnate({curloc:newCoordinate})
            console.log(`Latitude: ${lat}, Longitude: ${lng}`);
            return { latitude: lat, longitude: lng };
          } else {
            console.error('Geocoding failed:', data.status);
          }
        } catch (error) {
          console.error('Network error:', error);
        }
      }
      useEffect(() => {
      
        async function fetchChargerDetails() {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/maps/detailsbyid/${id}`);
                const chargerData = response.data;
                setChargerID(id)
                setName(chargerData.name);
                setPhone(chargerData.phone);
                setuserEmail(chargerData.email);
                setAddress(chargerData.address);
                setCity(chargerData.city);
                setEircode(chargerData.eircode);
                setDescription(chargerData.description);
            } catch (error) {
                console.error("Fetching charger details failed: ", error);
            }
        }

        fetchChargerDetails();
    }, [id]);

    const handlegeo =async (event)=>{
        event.preventDefault(); 
        try {
            const coords = await geocodeAddress(address);
            if (coords) {
            confirmsubmitHandler(); 
            } else {
            console.error('Geocode was not successful');
            }
        } catch (error) {
            console.error('Geocoding error:', error);
        }
    } 
 
    const handleNameChange = (event) => {
        setName(event.target.value);
      };
      const handlePhonechange = (event) => {
        setPhone(event.target.value);
      };
      const handleEmailchange = (event) => {
        setuserEmail(event.target.value);
      };
      const handleCitychange = (event) => {
        setCity(event.target.value);
      };
      const handleEircodechange = (event) => {
        setEircode(event.target.value);
      };
      const handleaddresschange = (event) => {
        setAddress(event.target.value);
      };
 
      const handledescriptionchange = (event) => {
        setDescription(event.target.value);
      };

    

      const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          let img = e.target.files[0];
          uploadImageToFirebase(img);
        }
      };
      const confirmsubmitHandler = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('city', city);
        formData.append('eircode', eircode);
        formData.append('availbleTime',selectedStartTime+'-'+selectedEndTime)
        formData.append('description', description);
        formData.append('coordinate', JSON.stringify(coordnate.curloc)); 
        formData.append('image', imageSrc); 
      
        try {
          const chargerData = {
            name:name,
            email:email,
            phone:phone,
            address:address,
            city:city,
            eircode:eircode,
            coordinate:{latitude:coordnate.curloc.latitude,longitude:coordnate.curloc.longitude},
            availbleTime:selectedStartTime+'-'+selectedEndTime,
            description:description,
            image:imageSrc,
           
          };
          const response = await axios.put(`http://192.168.0.11:5000/api/v1/maps/updaterbyid/${chargerID}`,chargerData,{
            headers: {
              'Content-Type': 'application/json'
            }});
      
          const result = response.data;
          alert('Charger successfully updated');
          navigate('/');
          console.log(result);
      
        } catch (error) {
        alert('There was an error update the home charger detail');
          console.error('Network error:', error);
        }
      };
    
    return(

        <div style={styles.defaultStyle}>
        <h1 style={{ alignSelf: 'center', fontSize: 25, fontStyle: 'normal', color: '#87A922', fontWeight: 'bold' }}>
          Update your EV charger Details
        </h1>
   
          <div
            style={{
              padding: 20,
              borderRadius: 10,
          
            }}
          >
             <form onSubmit={handlegeo} style={styles.formGroup}>
             <div>
                <label style={styles.label}>ChargerId</label>
                <input
                style={styles.input}
                type="text"
                placeholder={chargerID}
                />
            </div>
             <div>
                <label style={styles.label}>User Name</label>
                <input
                style={styles.input}
                type="text"
                value={name}
                onChange={handleNameChange}
                />
            </div>
            <div>
                <label style={styles.label}>Phone</label>
                <input
                style={styles.input}
                type="text"
                value={phone}
                onChange={handlePhonechange}
                />
            </div>
            <div>
                <label style={styles.label}>Email</label>
                <input
                style={styles.input}
                type="text"
                value={email}
                onChange={handleEmailchange}
                />
            </div>

            <div>
                <label style={styles.label}>Address</label>
                <input
                style={styles.input}
                type="text"
                value={address}
                onChange={handleaddresschange}
                />
            </div>

            <div>
                <label style={styles.label}>City</label>
                <input
                style={styles.input}
                type="text"
                value={city}
                onChange={handleCitychange}
                />
            </div>

            <div>
                <label style={styles.label}>Country</label>
                <input
                style={styles.input}
                type="text"
                value='Ireland'
                readOnly 
                />
            </div>
            <div>
                <label style={styles.label}>Eircode</label>
                <input
                style={styles.input}
                type="text"
                value={eircode}
                onChange={handleEircodechange}
                />
            </div>

            <div>
                <label style={styles.label}>Available Start Time</label>
                <select  style={styles.select} value={selectedStartTime} onChange={(e) => setselectedStartTime(e.target.value)}>
                    {allTimes.map((time) => (
                    <option key={time} value={time}>{time}</option>
                    ))}
                </select>
            </div>
            <div>
                <label style={styles.label}>Available End Time</label>
                <select  style={styles.select}value={selectedEndTime} onChange={(e) => setselectedEndTime(e.target.value)}>
                    {allTimes.map((time) => (
                    <option key={time} value={time}>{time}</option>
                    ))}
                </select>
            </div>

            <div>
                <label style={styles.label}>Description</label>
                <textarea
                style={styles.input}
                rows={4}
                cols={30}
                type="text"
                value={description}
                onChange={handledescriptionchange}
                />
            </div>
            
        
            <div>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    id="upload-image" 
                />
                {imageSrc && <img src={imageSrc} alt="Uploaded" style={{ width: '200px', height: 'auto' }} />}
            </div>
            <div>
                <button type="submit">Update</button>
            </div>
            </form>
            
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
  


export default UpdateDetail
