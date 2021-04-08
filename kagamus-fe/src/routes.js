import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import AnimeDisplay from "./pages/AnimeDisplay"
import AnimeSearchList from "./pages/AnimeSearchList"
import { createBrowserHistory as history } from 'history';

// In this class we have declared our routes
// We need this because these are what declare what happens when we go to "/" or "/home"
// So if we want to go to a page called AnimePage, we would have to do:
// <Route path="/anime" exact component={Anime} />, etc
export default class Routes extends Component {
    render() {
        return (
            <Router history={history()}>
                <Switch>

                    <Route path="/" exact >
                        <LoginPage />
                    </Route>
                    <Route path="/home" exact>
                        <Home />
                    </Route>
                    <Route path="/animeDisplay" exact>
                        <AnimeDisplay />
                    </Route>
                    <Route path="/animeSearch" exact>
                        <AnimeSearchList />
                    </Route>
                </Switch>
            </Router>
        )
    }
}