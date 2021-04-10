import React from "react";
import logo from "../images/1.png"
import SearchBar from "./SearchBar"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { useHistory } from 'react-router-dom'

const Header = ({ currentPage, userName }) => {
    let history = useHistory();

    const routeTo = (page) => {
        if (page === 'home') {
            history.push(`/home`);
        } else {
            history.push(`/myLists`);
        }
    }

    return (
        <div style={styles.mainContainer}>
            <img style={styles.logo} src={logo} alt="Logo" />
            <SearchBar style={{ flex: '1' }} />
            <div style={{ flex: '2.5', flexDirection: 'row', textAlign: 'center' }}>
                <p style={styles.navText(currentPage === 'Browse Lists')} 
                className='navText' onClick={() => {routeTo('home');}} > Browse Lists </p>
                <p style={styles.navText(currentPage === 'My Lists')}
                className='navText' onClick={() => {routeTo('myLists');}} > My Lists </p>
            </div>
            <div style={styles.userContainer}>
                <AccountCircleIcon style={styles.icon} />
                <p style={styles.userText} > {userName} </p>
            </div>
        </div>
    );
};

const styles = {
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0.75% 2.5%',
        backgroundColor: 'rgba(0, 0, 0, 0.825)',
        display: 'flex'
    },
    logo: {
        width: '7.5%',
        flex: '1',
        borderRadius: '7.5px',
    },
    navText: currentPage => ({
        color: "#FFF",
        display: 'inline',
        marginLeft: '20%',
        paddingBottom: '7px',
        borderBottom: currentPage ? '2px solid #FFF' : 'none'
    }),
    userText: {
        color: "#FFF",
        display: 'inline',
        marginLeft: '7.5%'
    },
    userContainer: {
        flex: '2.5',
        flexDirection: 'row',
        alignItems: 'left',
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: '3%'
    },
    icon: {
        color: "#FFF",
        height: '15%',
        width: '15%',
    }
}

export default Header;