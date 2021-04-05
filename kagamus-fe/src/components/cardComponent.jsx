import React from "react";
import './cardComponent.css';

const Card_Component = ({ animeListRequest }) => {
	return (
		<div className="container" >
			<div className="animeCard">
				<img src={animeListRequest["AnimeList"][0]["main_picture"]["medium"]} 
				alt="Profile" className="animeImage"></img>
				<div className="animeTitle">
					<p style={{fontWeight: 'bold', color: '#333333', fontSize: '16px', marginBottom: '-10px'}} >{animeListRequest["AnimeListTitle"]}</p>
					<p style={{fontSize: '12px', color: '#333333', textAlign: 'center' }} >{animeListRequest["username"]}</p>

				</div>

			</div>
			{animeListRequest["AnimeList"].map((anime, i) => {
				return (
					<div className="card" key={i} >
						<img src={anime["main_picture"]["medium"]} alt="Anime" className="cardImage"></img>
						<div className="cardTitle">
							<p>{anime["title"]}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Card_Component;