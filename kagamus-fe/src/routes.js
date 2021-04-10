import React, { useContext } from "react";
import { UserContext } from "./UserContext";

import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";

import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import AnimeDisplay from "./pages/AnimeDisplay"
import AnimeSearchList from "./pages/AnimeSearchList"
import MyLists from "./pages/MyLists"
import CreateList from "./pages/CreateList"

// In this class we have declared our routes
// We need this because these are what declare what happens when we go to "/" or "/home"
// So if we want to go to a page called AnimePage, we would have to do:
// <Route path="/anime" exact component={Anime} />, etc


function Routes() {
    const { user } = useContext(UserContext);

    return (
        <Router>
            <Switch>
                <Route path="/" exact >
                    <LoginPage />
                </Route>
                <Route path="/home" exact>
                    {user !== '' ? <Home /> : <Redirect to="/" />} 
                </Route>
                <Route path="/animeDisplay" exact>
                    {user !== '' ? <AnimeDisplay /> : <Redirect to="/" />}                       
                </Route>
                <Route path="/animeSearch" exact>
                    {user !== '' ? <AnimeSearchList /> : <Redirect to="/" />} 
                </Route>
                <Route path="/myLists" exact>
                    {user !== '' ? <MyLists /> : <Redirect to="/" />}                     
                </Route>
                <Route path="/createList" exact>
                    {user !== '' ? <CreateList /> : <Redirect to="/" />}                     
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes;
