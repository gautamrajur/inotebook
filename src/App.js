import './App.css';
import About from './Components/About';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import NoteState from './Context/Notes/NotesState';
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
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/about" element={<About/>}></Route>
          </Routes>
        </Router>
      </NoteState>
      </>
  );
}

export default App;
