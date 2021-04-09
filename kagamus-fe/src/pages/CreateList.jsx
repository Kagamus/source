import React, { useState, useEffect, useCallback } from "react";
import GeneralList from "../components/GeneralList";
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
	const [data, setData] = useState([]);
    const [searchList, setSearchList] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");

    const [offset, setOffset] = useState(1);
    const location = useLocation();
    const history = useHistory();

    const [title,setTitle] = useState("");

	const fetchAnime = () => {
        fetch(`http://localhost:9000/search?anime=${"a"}&offset=${(offset-1)*10}`)
            .then(res => res.json())
            .then(res => {
                setSearchList(res);
                console.log(searchList);
            });
    }

    useEffect(() => {
        fetchAnime();
        // console.log("searchList: ",searchList);
    }, [offset]);



    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            fetch(`http://localhost:9000/search?anime=${searchQuery}`)
                .then(res => res.json())
                .then(res => {
                    setSearchList(res);
                    // console.log(searchList);
                    console.log("data: ",data);
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
                        <GeneralList animeListRequest={data} ActionButton={DeleteIcon} data={data} action={setData} addDel ="del" title={"Added Anime"}/>
                    </div>
                    
                </div>
                <div style={styles.animeList}>
                    <div style={styles.mainSearchContainer}>
                        <input style={styles.searchContainer} placeholder="Search for Anime" type="text" size='40'
                            value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={handleSearch} />
                        </div>
                        <GeneralList animeListRequest={searchList} ActionButton={AddIcon} data={data} action={setData} addDel="add" title={"Search Results"}/>
                </div>
            </div>
        </div>
	);
}

const styles = {
    mainContainer: {
        // marginLeft: '20%',
        flex: '5',
        textAlign: 'center'
    },
    searchContainer: {
        padding: "0.4vw 2vw",
        borderRadius: '100px',
        border: '1px solid #A4A4A4',
        outline: 'none',
        backgroundColor: 'rgba(256, 256, 256, 1)',
        color: '#1E1E1E',
        width:"75%",
        margin:"2vh 0vw 2vh 0vw",
        textAlign:"center",
        justifyContent:"center"
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
        // backgroundColor: "lightblue",
        padding: "0vh 5vw 5.5vh 5vw",
        justifyContent:"center",
        border:"0.2vw solid",
        borderRadius:"13px",
        margin:"5vh 0vw 0vh 10vw"
        
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

    // searchContainer: {
    //     padding: "10px 60px",
    //     borderRadius: '100px',
    //     border: '1px solid #333333',
    //     outline: 'none',
    //     color: '#333333',
    //     flex: '1'
    // },
    pageAlign: {
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    },
    myListHeader: {
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
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