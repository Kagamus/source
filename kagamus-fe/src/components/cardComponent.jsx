import React, { useState } from "react";
import './cardComponent.css';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { useHistory } from 'react-router-dom'

const Card_Component = ({ animeListRequest, type }) => {

	const [showMenu, setShowMenu] = useState(false);

	const goTOInfoPage = (anime) => {
		history.push(`/animeDisplay?id=${anime['id']}`);
    }

	let history = useHistory();

	const handleDelete = () => {
		fetch(`http://localhost:9000/deleteList`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(animeListRequest)
		})
			.then(res => res.json())
			.then(res => {
				console.log(res);
				window.location.reload();
			});
	}

	const handleEdit = () => {
		history.push(`/createList?id=${animeListRequest['_id']}`);
	}

	return (
		<div className="container" >
			<div className="animeCard">
				<img src={animeListRequest["AnimeList"][0]["main_picture"]["medium"]}
					alt="Profile" className="animeImage"></img>
				<div className="animeTitle">
					<p style={{ fontWeight: 'bold', color: '#333333', fontSize: '16px', marginBottom: '-10px' }} >{animeListRequest["AnimeListTitle"]}</p>
					<p style={{ fontSize: '12px', color: '#333333', textAlign: 'center' }} >{animeListRequest["username"]}</p>
				</div>
				{type === 'myList' ?
				<>
					<MoreVertIcon className='menuIcon' onClick={() => {setShowMenu(!showMenu);}} />
					{showMenu ? 
					<>
						<div className='editMenu' >
							<div className='menu' onClick={() => {handleDelete()}}>
								<DeleteIcon style={{fontSize: '20px', color: 'red'}} />
							</div>
							<div className='divider' ></div>
							<div className='menu' onClick={() => {handleEdit()}} >
								<EditIcon style={{fontSize: '20px'}} />
							</div>							
						</div>
					</> 
					: <></>}					
				</>
				: <></> }
			</div>
			{animeListRequest["AnimeList"].map((anime, i) => {
				return (
					<div className="card" key={i} onClick={() => {goTOInfoPage(anime)}} >
						<img src={anime["main_picture"]["medium"]} alt="Anime" className="cardImage"></img>
						<div className="cardTitle">
							<p>{anime["title"]}</p>
						</div>
						<ArrowForwardIcon className="goTOIcon" />
					</div>
				);
			})}
		</div>
	);
}

export default Card_Component;