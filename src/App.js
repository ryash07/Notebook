import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Route,Routes,
} from "react-router-dom";
import NoteState from './context/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {

  const [alert , setAlert] = useState(null);

  const showAlert =(message , type) =>{
      setAlert({
        message : message,
        type : type
      })

      setTimeout(() => {
        setAlert(null);
      }, 1800);
  };

  return (
    <>
    <NoteState>
     <BrowserRouter>
        <Navbar alert={showAlert}/>
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
          <Route exact path='/' element ={<Home alert={showAlert}/>}></Route>
          <Route exact path='/about' element ={<About/>}></Route>
          <Route exact path='/login' element ={<Login alert={showAlert}/>}></Route>
          <Route exact path='/signup' element ={<Signup alert={showAlert}/>}></Route>
        </Routes>
        </div>
        </BrowserRouter>
        </NoteState>
    </>
  );
}

export default App;
