//import logo from './logo.svg';
//import './App.css';
import { StyledEngineProvider } from '@mui/material';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './compoent/Header';
import AddCharger from './compoent/AddCharger';
import UpdateDetail from './compoent/UpdateDetail';
import DeleteCharger from "./compoent/DeleteCharger";
import Home from './compoent/Home';
import SearchHomeChargers from './compoent/SearchCharger';
import SavedCharger from './compoent/SavedCharger';
function App() {
  return (
    <StyledEngineProvider injectFirst>
    <BrowserRouter>
    <CssBaseline/>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/listings' element={<SearchHomeChargers/>}/>
      <Route path='/addcharger' element={<AddCharger/>}/>
      <Route path='/updatedetail/:id' element={<UpdateDetail/>}/>
      <Route path='/deletecharger/:id' element={<DeleteCharger/>}/>
      <Route path='savedcharger' element={<SavedCharger/>}/>
    </Routes>
    </BrowserRouter>

  </StyledEngineProvider>
  );
}

export default App;
