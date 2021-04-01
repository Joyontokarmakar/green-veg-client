import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Admin from './components/Admin/Admin';

export const userContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <div className="App">
      <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <Header/>
          <Switch>

            <Route path="/home">
              <Home/>
            </Route>

            <Route exact path="/">
              <Home/>
            </Route>

            <Route exact path="/login">
              {/* <SignIn/> */}
              <Login/>
            </Route>

            <PrivateRoute exact  path="/admin">
              <Admin/>
            </PrivateRoute>

            <Route exact path="*">
              <h1 className="text-center">Page Not Found</h1>
            </Route>

          </Switch>
        </Router>
      </userContext.Provider>
    </div>
  );
}

export default App;