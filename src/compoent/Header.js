import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Typography, AppBar, Toolbar,Menu,MenuItem, Icon} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function Header() {
    const navigate = useNavigate();
   

	const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
        
	
  return (
    <AppBar position="static" style={{backgroundColor:"black"}}>
        <Toolbar>
            <div style={{marginRight:'auto'}}>
            <Button color="inherit" onClick={()=>navigate('/')}>
                <Typography variant='h6'>Home Chargers Location map</Typography>{" "}
            </Button>
            </div>
            <div>
            <Button color="inherit" onClick={()=>navigate('/listings')}><Typography variant='h6'>search Home Chargers</Typography></Button>
          
            </div>
            <div style={{marginLeft:'auto',marginRight:'10rem'}}>
            <Button sx={{backgroundColor:"green",color:'white',width:'15rem',fontSize:'1,1rem',marginRight:'1rem','&:hover':{backgroundColor:'blue'}}} onClick={()=>navigate('/addcharger')}>Add Home Chargers</Button> 
            </div>
            <div>
      <Icon onClick={handleClick}>
        <AccountCircleIcon  />
      </Icon>
      <Menu
        id="user-profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "user-profile-button",
        }}
      >
        <MenuItem onClick={() => {
          navigate('/savedcharger');
          handleClose();
        }}>Saved Home Charger</MenuItem>
      </Menu>
    </div>
            
            {/* <div style={{marginLeft:'auto',marginRight:'10rem'}}>
            <Button sx={{backgroundColor:"green",color:'white',width:'15rem',fontSize:'1,1rem',marginRight:'1rem','&:hover':{backgroundColor:'blue'}}} onClick={()=>navigate('/updatedetail')}>Update Home Chargers</Button>
                       
            </div>
            <div style={{marginLeft:'auto',marginRight:'10rem'}}>
            <Button sx={{backgroundColor:"red",color:'white',width:'15rem',fontSize:'1,1rem',marginRight:'1rem','&:hover':{backgroundColor:'blue'}}} onClick={()=>navigate('/deletecharger')}>Delete Home Chargers</Button>
                       
            </div> */}
        
        
        
        </Toolbar>
    </AppBar>
  )
}

export default Header
