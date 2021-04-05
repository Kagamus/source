import React from "react";
import './cardComponent.css';
import img_OP from '../test_list.jpg';

const Card_Component = ({ animeListRequest }) => {
	return (
		<div className="container" >
			<div className="card">
				<img src={animeListRequest["AnimeList"][0]["node"]["main_picture"]["medium"]} 
				alt="Profile" className="animeImage"></img>
				<p className="animeTitle">{animeListRequest["AnimeListTitle"]}</p>
			</div>
			{animeListRequest["AnimeList"].map((anime, i) => {
				return (
					<div className="card" key={i} >
						<img src={anime["node"]["main_picture"]["medium"]} className="cardImage"></img>
						<div className="cardTitle">
							<p>{anime["node"]["title"]}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Card_Component;