import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import About from './components/About/About';
import Notes from './components/Notes/Notes';
import Navbar from './components/Navbar/Navbar';
import AddNote from './components/AddNote/AddNote';
import { useDispatch,  } from 'react-redux';
import { useEffect, useState } from 'react';
import { Alert } from './components/Alert/Alert';
import {getNoteItems} from './features/noteSlice'
import Spinner from './components/Spinner/Spinner';
import { useSelector } from 'react-redux';


function App() {
  const [alert, setAlert] = useState(null);
  const dispatch = useDispatch();
  const {isLoading}=useSelector((store)=>store.note);
  
  useEffect(()=>{
    if(localStorage.getItem("token")){
      dispatch(getNoteItems());
      console.log("calling");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  if(isLoading){
    return <Spinner/>
  }

  const showAlert = (message, type) => {
    console.log(alert);
    setAlert({
      msg: message,
      type: type
    })

    setTimeout(() => {
      setAlert(null);
    }, 1500)
  }
  return (
    <Router>
      <Navbar showAlert={showAlert} />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/login" element={<Login showAlert={showAlert} />} />
        <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
        <Route exact path="/notes" element={<Notes showAlert={showAlert} />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/addnote" element={<AddNote showAlert={showAlert} />} />
      </Routes>
      <Alert alert={alert} />
    </Router>


  );
}

export default App;
