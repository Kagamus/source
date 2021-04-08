import React, { Component } from "react";
import { Router, Switch, Route,Redirect,Link } from "react-router-dom";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import history from './pages/history';

let isLogged = true;
// In this class we have declared our routes
// We need this because these are what declare what happens when we go to "/" or "/home"
// So if we want to go to a page called AnimePage, we would have to do:
// <Route path="/anime" exact component={Anime} />, etc
export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>

                    <Route path="/" exact >
                        <LoginPage />
                    </Route>
    
                    <Route path="/home" exact>
                        <Home />
                    </Route>
                  
                    {/* <Route exact path="/home">
                    {isLogged ? <Redirect to="/" /> : <LoginPage />}
                    </Route>
         */}

                </Switch>
            </Router>
        )
    }
}