import Select from 'react-select'

import React, { useState, useEffect, useContext } from "react";
import {useHistory} from "react-router-dom";
import { UserContext } from "../UserContext";
import { options } from '../utils/constants.js'

import GeneralList from "../components/GeneralList";
import Header from '../components/Header';

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

function Home() {
    const { user } = useContext(UserContext);
    const [genre, setGenre] = useState({ value: '', label: '' });
    const [data, setData] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const history = useHistory();
    const [searchQuery, setSearchQuery] = useState("");

    const [offset, setOffset] = useState(1);

    const [title, setTitle] = useState("");

    const insertToDB = () => {
        if (user == "") {
            alert("Internal Error.");
        }
        else if (title == "") {
            alert("Please enter the title.");
        }
        else if (genre.value == "" || genre.value == "clear") {
            alert("Please enter the genre.");
        }
        else if (data.length == 0) {
            alert("Please add some anime.")
        } else {
            const currList = { "Genre": genre.value, "username": user, "AnimeListTitle": title, "AnimeList": data };
            fetch(`http://localhost:9000/createnewList`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(currList)
            })
                .then(res => res.json())
                .then(res => {
                    console.log("data: ", data);
                    history.replace("./myLists");
                });
        }
    }

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            fetch(`http://localhost:9000/search?anime=${searchQuery}&offset=${(offset - 1) * 10}`)
                .then(res => res.json())
                .then(res => {
                    setSearchList(res);
                    console.log("data: ", data);
                });
        }
    }

    return (
        <div>
            <Header currentPage={'My Lists'} />
            <div style={styles.pageAlign}>
                <div style={styles.animeForm}>
                    <input style={styles.InputFields} type="text" placeholder="Title" onChange={e => setTitle(e.target.value)} />
                    <div style={styles.userList}>
                        <GeneralList animeListRequest={data} ActionButton={DeleteIcon} data={data} action={setData} addDel="del" title={"Added Anime"} />
                    </div>
                    <Select
                        label="Single select"
                        placeholder={"Select Genre"}
                        styles={customStyles}
                        onChange={setGenre}
                        width="25vmin"
                        menuColor="#1E1E1E"
                        options={options}
                    />
                    <button style={styles.createButton} onClick={() => { insertToDB() }}>
                        Create List
                    </button>

                </div>
                <div style={styles.animeList}>
                    <div style={styles.mainSearchContainer}>
                        <input style={styles.searchContainer} placeholder="Search for Anime" type="text" size='40'
                            value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={handleSearch} />
                    </div>
                    <GeneralList animeListRequest={searchList} ActionButton={AddIcon} data={data} 
                    action={setData} addDel="add" title={`Search Results`} />
                </div>
            </div>
        </div>
    );
}

const styles = {
    mainContainer: {
        flex: '5',
        textAlign: 'center'
    },
    searchContainer: {
        padding: "0.6vw 2vw",
        borderRadius: '100px',
        border: '1px solid #A4A4A4',
        outline: 'none',
        backgroundColor: 'rgba(256, 256, 256, 1)',
        color: '#1E1E1E',
        width: "70%",
        margin: "2vh 0vw 0vh 0vw",
        textAlign: "center",
        justifyContent: "center"
    },
    cardImage: {
        flex: "1.5",
        padding: "10px",
        height: "7vmin",
        maxWidth: "5vmin"
    },
    listContainer: isLast => ({
        flexDirection: 'row',
        display: 'flex',
        width: '60%',
        paddingBottom: '5%',
        marginBottom: '5%',
        borderBottom: isLast ? '0' : '0.5px solid #A6A6A6',

    }),
    InputFields: {
        border: "none",
        margin: "6vh 0vh 3vh 0vh",
        borderRadius: "100vw",
        border: "solid 0.10vw",
        outline: "none",
        textAlign: "center",
        padding: "1.1vh 0.95vw 1.1vh 0.95vw",
        color: "#1E1E1E",
        opacity: 1.0,
        fontFamily: "Proxima Nova",
        fontSize: "0.8vw",
        width: "15vw",
    },
    // Our list to them
    animeList: {
        padding: "0vh 0vw 0vh 0vw",
        justifyContent: "center",
        border: "2px solid",
        borderRadius: "13px",
        margin: "-2vh 12vw 0vh 7vw",
        height: '75vmin'

    },
    // The user's list of anime
    animeForm: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        backgroundColor: "white",
        margin: "0vh 7vw 0vh 14vw",
        padding:"0vh 0vh 0vh 0vh",
    },
    userList: {
        padding: "0vh 0 0 0",
        border: "2px solid",
        borderRadius: "13px",
        marginBottom:"4vh"
    },

    pageAlign: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        padding: "0vmin"

    },
    myListHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    myListTitle: {
        marginRight: "9v",
        marginLeft: "19vw",
        marginBottom: "7.5vh",
        fontSize: "4vmax"
    },
    plusIcon: {
        paddingLeft: "1vmin"
    },
    createButton: {
        outline: 'none',
        border: 'none',
        backgroundColor: '#3c3c3c',
        color: '#fff',
        fontSize: "1.7vmin",
        borderRadius: "5vmin",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        height: "2.4vmax",
        width: "8.2vmax",
        fontWeight: "500",
        marginTop:"4vh",
        marginBottom:"0vh"

    },
}

const customStyles = {
    menu: (provided, state) => ({
        ...provided,
        width: state.selectProps.width,
        marginTop: -0.5,
        color: state.selectProps.menuColor,
        padding: 20,
        top: "auto", 
        bottom: "100%"
    }),
    control: (_, { selectProps: { width } }) => ({
        border: '1px solid black',
        display: 'flex',
        borderRadius: '20px',
        flexDirection: "row",
        flex: "1",
        width: width
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
        return { ...provided, opacity, transition };
    }
}

export default Home;