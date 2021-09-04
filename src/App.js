import './App.css';
import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HomePage from './components/HomePage.js';
import Todos from './components/Todos.js';
import Calender from './components/Calender.js';



function App() {
  const [user, setuser] = useState(true)
  while (!user) {
    return (
      <Router>
        <Switch>
          <Route matches path="/">            {/* matches will allow nested routes */}
            <HomePage loggedin={setuser} />
          </Route>
          <Route path="*">
            <h1>404</h1>
          </Route>
        </Switch>
      </Router>
    );
  }
  while (user) {
    return (
      <Router>
        <Switch>
          <Route matches path="/">       {/* "exact" will not allow nested routes */}
          <Calender/>
          </Route>
          <Route matches path="/todo">       {/* "exact" will not allow nested routes */}
            <Todos />
          </Route>
          <Route path="*">
            <h1>404</h1>
          </Route>
        </Switch>
      </Router>
    );
  }

}

export default App;
