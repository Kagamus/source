import React, { useState, useEffect } from "react";
import CardComponent from "../components/cardComponent.jsx";
import Select from 'react-select'
import { options } from '../utils/constants.js'
import SearchIcon from '@material-ui/icons/Search';


function Home() {
	const [genre, setGenre] = useState({ value: '', label: '' });
	const [keyword, setKeyword] = useState("");
	const [data, setData] = useState([])

	const filterHandler = () => {
		fetch(`http://localhost:9000/home?keyword=${keyword}&genre=${genre["value"]}`)
			.then(res => res.json())
			.then(res => {
				setData(res);
			});
	}

	useEffect(() => {
		filterHandler();
	}, []);

	return (
		<div>
			<div style={styles.filterContainer}>
				<Select
					label="Single select"
					placeholder={"Select Genre"}
					styles={customStyles}
					onChange={setGenre}
					width="200px"
					menuColor="black"
					options={options}
				/>

				<div style={styles.mainContainer}>
					<SearchIcon style={styles.icon} />
					<input
						style={styles.container}
						placeholder="Keyword"
						type="text"
						size="40"
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
					/>
				</div>

				<button style={styles.filterButton} onClick={filterHandler}>
					Apply
				</button>
			</div>

			<div style={{ flexDirection: "row", display: "flex" }}>

				{data.map((list, i) => {
					return (
						<div style={{ margin: "10% 5%" }} key={i} >
							<CardComponent animeListRequest={list} />
						</div>
					);
				})}

			</div>
		</div>
	);
}


const customStyles = {
	menu: (provided, state) => ({
		...provided,
		width: state.selectProps.width,
		border: '1px solid black',
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

const styles = {
	container: {
		padding: "10px 60px",
		borderRadius: '100px',
		border: '1px solid #333333',
		outline: 'none',
		color: '#333333',
		flex: '1'
	},
	icon: {
		position: "absolute",
		padding: '7px 15px',
		color: '#A4A4A4',
		textAlign: 'center'
	},
	filterContainer: {
		flexDirection: 'row',
		display: 'flex',
		marginTop: "5%"
	},
	filterButton: {
		outline: 'none',
		backgroundColor: '#3c3c3c',
		color: '#fff',
		borderRadius: "100px",
		padding: "0px 45px",
		alignItems: "center",
		display: "flex"
	}
}

export default Home;
