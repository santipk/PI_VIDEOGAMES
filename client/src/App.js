import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import {Route, Switch} from "react-router-dom"
import LandingPage from './components/landingPage/Landing.jsx';
import Home from './components/Home/Home';
import VideoGame  from "./components/gameDetails/VideoGame.jsx"
import AddGame from "./components/addGame/AddGame.jsx"
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path = "/" component= {LandingPage}/>
          <Route exact path = "/home" component = {Home}/>
          <Route path = "/home/:id" component = {VideoGame}/>
          <Route path = "/create" component = {AddGame}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
