import './App.css';
import About from './Components/About';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import NoteState from './Context/Notes/NotesState';
//import Alert from './Components/Alert';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";




function App() {
  return (
      <>
      <NoteState>
        <Router>
          <Navbar/>
          {/* <Alert message="This is amazing"/> */}
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/about" element={<About/>}></Route>
          </Routes>
          </div>
        </Router>
      </NoteState>
      </>
  );
}

export default App;
