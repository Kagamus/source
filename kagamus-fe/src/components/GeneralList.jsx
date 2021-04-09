import React from "react";
import '../components/genList.css';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const GeneralList = ({ animeListRequest, ActionButton,data,action, addDel,title }) => {

	const goTOInfoPage = (anime) => {
        // console.log("")
        if(addDel === "add") {
        // We only need to check for ID because the IDs are all unique, in the context of the API
            if (data.some(dat => dat.id == anime.id) == false) {
                action(data.concat(anime));
                console.log("Changed Data in GeneralList");
            }
        } else {
            action(data.filter(dat => dat.id !== anime.id));
        }
        // console.log(data([data]));
        // data(data => [...data, anime]);
    }

	return (
		<div className="container" >
			<div className="animeCard" style={{}}>
				{/* <img src={animeListRequest[0]["main_picture"]["medium"]}
					alt="Profile" className="animeImage"></img> */}
                    {/* <p style={{ fontWeight: 'bold', color: '#333333', fontSize: '16px'}} >Search Results</p> */}
                <p style={{ fontSize: '2vw', color: '#333333',  margin:" 0vh 0vw 0vh 0vw", width:"8vw",padding:"0vh 32% 0vh 32%"}} >{title}</p>

			</div>
			{animeListRequest.map((anime, i) => {   
				return (
					<div className="card" key={i}  >
						<img src={anime["main_picture"]["medium"]} alt="Anime" className="cardImage"></img>
						<div className="cardTitle">
							<p>{anime["title"]}</p>
						</div>
						<ActionButton className="goTOIcon" onClick={() => {goTOInfoPage(anime)}}/>
					</div>
				);
			})}
		</div>
	);
}

export default GeneralList;