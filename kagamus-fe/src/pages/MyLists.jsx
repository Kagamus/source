import React, { useState, useEffect } from "react";
import CardComponent from "../components/cardComponent.jsx";
import Select from 'react-select'
import { options } from '../utils/constants.js'
import AddIcon from '@material-ui/icons/Add';
import Header from '../components/Header';
import { useHistory } from "react-router";

function Home() {
	const [genre, setGenre] = useState({ value: '', label: '' });
	const [keyword, setKeyword] = useState("");
	const [data, setData] = useState([])
	const history = useHistory();

	const filterHandler = () => {
		fetch(`http://localhost:9000/mylists?user=${localStorage.getItem('userName').toString().valueOf()}`)
			.then(res => res.json())
			.then(res => {
				setData(res);
			});
	}

	useEffect(() => {
		filterHandler();
	}, []);

	const routeToCreate = () => {

        history.push("/create");
    }

	return (
		<div>
			<Header currentPage={'My Lists'} userName={localStorage.getItem('userName').toString().valueOf()} />
			
      <div style={styles.pageAlign}>
      <div style={styles.myListHeader}>
        <p style={styles.myListTitle}>My Lists</p>
        <button style={styles.createButton} onClick={() => { routeToCreate(); }}>
          Create List <AddIcon style={styles.plusIcon}/>
        </button>
      </div>
			
			{data.map((data_list, i) => {
				return (
					<div style={styles.cardContainer} key={i} >
						{data_list.map((list, index) => {
							return (
								<div style={{ margin: "2.5% 5%" }} key={index} >
									<CardComponent animeListRequest={list} />
								</div>
							);
						})}
					</div>
				);
			})}
      </div>
		</div>
	);
}

const styles = {
  pageAlign: {
    display:"flex",
    flexDirection:"column",
    alignItems:"center"
  },
  myListHeader: {
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    marginBottom:"0vmin",
	marginTop: "0vmin",
  },
  myListTitle: {
    marginRight: "9v",
    marginLeft: "19vw",
    marginBottom:"2.92vh",
	marginTop:"5.5vh",
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
	cardContainer: {
		flexDirection: "row",
		display: "flex",
		justifyContent: "center",
		marginTop:"0vmin"
	}
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