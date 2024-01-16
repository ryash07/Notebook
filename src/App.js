import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Route,Routes,
} from "react-router-dom";
import NoteState from './context/NoteState';
import Alert from './components/Alert';
function App() {
  return (
    <>
    <NoteState>
     <BrowserRouter>
        <Navbar />
        <Alert message="Hello how u doing?"/>
        <div className="container">
        <Routes>
          <Route exact path='/' element ={<Home/>}></Route>
          <Route exact path='/about' element ={<About/>}></Route>
        </Routes>
        </div>
        </BrowserRouter>
        </NoteState>
    </>
  );
}

export default App;
