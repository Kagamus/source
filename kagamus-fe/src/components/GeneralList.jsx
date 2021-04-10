import React from "react";
import '../components/genList.css';

const GeneralList = ({ animeListRequest, ActionButton,data,action, addDel,title }) => {

	const goTOInfoPage = (anime) => {
        if(addDel === "add") {
        // We only need to check for ID because the IDs are all unique, in the context of the API
            if (data.some(dat => dat.id == anime.id) == false) {
                action(data.concat(anime));
                console.log("Changed Data in GeneralList");
            }
        } else {
            action(data.filter(dat => dat.id !== anime.id));
        }
    }

	return (
		<div className="containerGen" >
			<div className="animeCardGen" >				
                <p style={{ fontSize: '1.5vw', color: '#333333',  margin:"0", width:"40vw",padding:"0"}} >{title}</p>
			</div>
			{animeListRequest.map((anime, i) => {   
				return (
					<div className="cardGen" key={i}  >
						<img src={anime["main_picture"]["medium"]} alt="Anime" className="cardImageGen"></img>
						<div className="cardTitleGen">
							<p>{anime["title"]}</p>
						</div>
						<ActionButton style={styles.icon(addDel === "del")} className="goTOIcoGen" onClick={() => {goTOInfoPage(anime)}}/>
					</div>
				);
			})}
		</div>
	);
}
const styles = {

	icon:isDel => ({
		color:isDel ? "red" : "black"
	})


}
export default GeneralList;