import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import React, { useState, useEffect } from 'react';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  
  Route,
  Routes
} from "react-router-dom";
import ModalLoginForm from './ModalLoginForm';


 
function App() {
  const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }

  const toggleMode = ()=>{
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      showAlert("Dark mode has been enabled", "success");
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled", "success");
    }
  }

  const [showModal, setShowModal] =useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const timeoutId = setTimeout(openModal, 5000); // Show modal after 1 minute of inactivity

    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <>
    <Router>
    <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} key={new Date()} />
    <Alert alert={alert}/>
    <ModalLoginForm showModal={showModal} closeModal={closeModal} />
    <div className="container my-3">
    <Routes>

    {/* /users --> Component 1
        /users/home --> Component 2 */}
          <Route exact path="/about" element={<About mode={mode} />}>
            
          </Route>
          <Route exact path="/"
          
          element={<TextForm showAlert={showAlert} heading="Try TextUtils - word counter, character counter, remove extra spaces" mode={mode}/>}
          >
          </Route>
    
    </Routes>
    </div>
    </Router>
    </> 
  );
}

export default App;