import React, { useState, useEffect, useContext } from "react";
import CardComponent from "../components/cardComponent.jsx";
import AddIcon from '@material-ui/icons/Add';
import Header from '../components/Header';
import { useHistory } from "react-router";
import { UserContext } from "../UserContext";

function Home() {
	const { user } = useContext(UserContext);
	const [data, setData] = useState([])
	const history = useHistory();

	useEffect(() => {
		const filterHandler = () => {
			fetch(`http://localhost:9000/mylists?user=${user}`)
				.then(res => res.json())
				.then(res => {
					setData(res);
				});
		}
		filterHandler();
	}, [user]);

	const routeToCreate = () => {

		history.push("/createList");
	}

	return (
		<div>
			<Header currentPage={'My Lists'} />

			<div style={styles.pageAlign}>
				<div style={styles.myListHeader}>
					<p style={styles.myListTitle}>My Lists</p>
					<button style={styles.createButton} className='button' onClick={() => { routeToCreate(); }}>
						Create List <AddIcon style={styles.plusIcon} />
					</button>
				</div>
			</div>

				{data.map((data_list, i) => {
					return (
						<div style={styles.cardContainer} key={i} >
							{data_list.map((list, index) => {
								return (
									<div style={{ margin: "2.5% 5%" }} key={index} >
										<CardComponent animeListRequest={list} type={'myList'} />
									</div>
								);
							})}
						</div>
					);
				})}
			
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
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: "0vmin",
		marginTop: "0vmin",
	},
	myListTitle: {
		marginRight: "9v",
		marginLeft: "19vw",
		marginBottom: "2.92vh",
		marginTop: "5.5vh",
		fontSize: "4vmax",
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
		marginLeft: "10.5vw",
		fontWeight: "500",
		marginTop: '3vmin'

	},
	cardContainer: {
		flexDirection: "row",
		display: "flex",
		justifyContent: "center",
	}
}

export default Home;