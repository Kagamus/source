import React, { Component } from "react";
import {Switch, Route ,BrowserRouter as Router} from "react-router-dom";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import MyLists from "./pages/MyLists";
import CreateLists from "./pages/CreateList"


// In this class we have declared our routes
// We need this because these are what declare what happens when we go to "/" or "/home"
// So if we want to go to a page called AnimePage, we would have to do:
// <Route path="/anime" exact component={Anime} />, etc
export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>

                    <Route path="/" exact >
                        <LoginPage />
                    </Route>
    
                    <Route path="/home" exact>
                        <Home />
                    </Route>
                    <Route path="/mylists" exact>
                        <MyLists />
                    </Route>
                    <Route path="/create" exact>
                        <CreateLists />
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