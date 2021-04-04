
import React from "react";
import './card_component.css';
import img_OP from '../test_list.jpg';
import img_logo from '../test_logo.png';

const Card_Component = ({animeListRequest}) => {

  return (
		<div className="example">
			<div className="container">
			<div className="card">
				<img src={img_OP} className="cardImage"></img>
				<p className="cardTitle">{animeListRequest["AnimeListTitle"]}</p>
			</div>
				{animeListRequest["AnimeList"].map((anime, index) => {
						return (
							<div className="card">
								<img src= {anime["main_picture"]["medium"]} className="animeImage"></img>
								<div className="animeTitle">
									{/* <p>Top 10 Anime</p> */}
									<p>{anime["title"]}</p>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);



}




export default Card_Component;