import React, { useState, useEffect } from "react";
import CardComponent from "../components/cardComponent.jsx";
import Select from 'react-select'
import { options } from '../utils/constants.js'
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import { useHistory, useLocation } from "react-router";

function Home() {
	const [genre, setGenre] = useState({ value: '', label: '' });
	const [keyword, setKeyword] = useState("");
	const [data, setData] = useState([]);
    const [myAnimes, setMyAnimes] = useState([]);
    const [searchList, setSearchList] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");

    const [offset, setOffset] = useState(1);
    const location = useLocation();
    const history = useHistory();

    const [title,setTitle] = useState("");

	const fetchAnime = () => {
        fetch(`http://localhost:9000/search?anime=${searchQuery}&offset=${(offset-1)*10}`)
            .then(res => res.json())
            .then(res => {
                setSearchList(res);
                console.log(searchList);
            });
    }

    useEffect(() => {
        fetchAnime();
    }, [offset]);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            fetch(`http://localhost:9000/search?anime=${searchQuery}`)
                .then(res => res.json())
                .then(res => {
                    setSearchList(res);
                    // console.log(searchList);
                });
        }
    }

	return (
		<div>
			<Header currentPage={'Create List'} userName={localStorage.getItem('userName').toString().valueOf()} />
            <div style={styles.pageAlign}>
                <div style={styles.animeForm}>
                    <input style={styles.InputFields} type="text" placeholder="Title" onChange={e => setTitle(e.target.value)} />
                    <div style={styles.userList}>
                        <h4>Add Anime</h4>
                        {/* {data["AnimeList"].map((anime, i) => {
                            return (
                                <div className="card" key={i} onClick={() => {}} >
                                    <img src={anime["main_picture"]["medium"]} alt="Anime" className="cardImage"></img>
                                    <div className="cardTitle">
                                        <p>{anime["title"]}</p>
                                    </div>
                                    <DeleteIcon className="goTOIcon" />
                                </div>
                            );
			            })} */}
                    </div>
                </div>
                <div style={styles.animeList}>
                    <div style={styles.mainSearchContainer}>
                        <div style={styles.mainContainer}>
                            <SearchIcon style={styles.icon} />
                            <input style={styles.container} placeholder="Search for Anime" type="text" size='40'
                                value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={handleSearch} />
                        </div>
                            {searchList.map((anime, i) => {
                            return (
                                <div style={styles.listContainer(i == searchList.length-1)} key={i} >
                                    <img src={anime['main_picture']['large']} alt="anime" style={styles.animeImg} 
                                    onClick= {() => {console.log("HIII");}} className='animeImg' style={styles.cardImage}/>
                                    <div style={styles.animeInfoContainer} >
                                        <p style={styles.animeTitle} className='animeListingTitle' onClick= {() => {console.log("HIII");}}>
                                            {anime['title']} </p>
                                    </div>
                                    <div style={styles.followeButton} className='followeButton' onClick= {() => {console.log("BYEEE");}} >
                                        <p style={{marginRight: '5%', fontSize: '15px'}} >Follow Page</p>
                                        <AddIcon style={{ fontSize: '20px' }} />
                                    </div>
                                </div>
                                )
                            })}
                    </div>
                </div>
            </div>
        </div>
	);
}

const styles = {
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
		margin: "12vh 0vh 3vh 0vh",
		borderRadius: "100vw",
        border:"solid 0.10vw",
        outline:"none",
        textAlign: "center",
		padding: "1.1vh 0.95vw 1.1vh 0.95vw",
		color: "#1E1E1E",
		opacity: 1.0,
		fontFamily: "Proxima Nova",
        fontSize:"0.8vw",
		background: "white",
		width: "10vw",
	},
    animeList: {
        backgroundColor: "blue",
        padding: "0vh 9vw 0vh 9vw",
        width: "20vw",
        height: "40vh"
    },
    animeForm: {
        // margin: "0vh 9vw 0vh 9vw",
        alignContent: "center",
        textAlign: "center",
        justifyContent: "center",
        //The background and padding is there just for debugging
        backgroundColor: "gray",
    },
    userList: {
        padding: "0vh 0 0 0",
        border: "0.1vh solid"
    },
    mainSearchContainer: {
        marginLeft: '5%',
        marginRight: '10%'
    },
    searchContainer: {
        padding: "10px 60px",
        borderRadius: '100px',
        border: '1px solid #333333',
        outline: 'none',
        color: '#333333',
        flex: '1'
    },
    pageAlign: {
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    },
    myListHeader: {
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        marginBottom:"0vmin"
    },
    myListTitle: {
        marginRight: "9v",
        marginLeft: "19vw",
        marginBottom:"7.5vh",
        fontSize:"4vmax"
    },
    plusIcon: {
        paddingLeft: "1vmin"
        
    },
    // Equivalent to the filterButton in the Home.jsx
	createButton: {
		outline: 'none',
		border: 'none',
		backgroundColor: '#3c3c3c',
		color: '#fff',
		fontSize:"1.7vmin",
		borderRadius: "5vmin",
		alignItems: "center",
		justifyContent:"center",
		display: "flex",
		height: "2.4vmax",
		width:"8.2vmax",
		marginLeft:"10.5vw",
		fontWeight:"500",

	},
}

const customStyles = {
	menu: (provided, state) => ({
		...provided,
		width: state.selectProps.width,
		marginTop: -0.5,
		color: state.selectProps.menuColor,
		padding: 20,
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