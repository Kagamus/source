import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import HomePage from "./pages/HomePage";
import {createBrowserHistory as history} from 'history';

// In this class we have declared our routes
export default class Routes extends Component {
    render() {
        return (
            <Router history={history()}>
                <Switch>
                    
                    <Route path="/" exact component={LoginPage} />
                    <Route path="/home" exact component={HomePage} />
                    {/* <Route path="/" exact>
                        <LoginPage/>
                    </Route> */}
                </Switch>
            </Router>
        )
    }
}