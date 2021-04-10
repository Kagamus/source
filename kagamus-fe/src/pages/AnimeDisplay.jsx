import React, { useState, useEffect } from "react";
import Header from '../components/Header';

import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import { useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'

const AnimeDisplay = () => {
    let history = useHistory();

    const {search} = useLocation()
	const { id } = queryString.parse(search)
    const [data, setData] = useState('');
    const [ratingValue, setRatingValue] = useState(3.5);
    const [mainImg, setMainImg] = useState('');
    const [showRelated, setShowRelated] = useState(0);
    const [showRecommended, setShowRecommended] = useState(0);

    const fetchHandler = () => {
        fetch(`http://localhost:9000/animeInfo?id=${id}`)
            .then(res => res.json())
            .then(res => {
                setData(res);
                setMainImg(res['main_picture']['large'])
            });
    }

    const handleRelated = (direction, type) => {
        if (direction === 'left') {
            if (showRelated > 4 && type === 'related_anime') {
                setShowRelated(showRelated - 5);
            } else if (showRecommended > 4 && type === 'recommendations') {
                setShowRecommended(showRecommended - 5)
            }
        } else {
            if (showRelated + 5 < data['related_anime'].length && type === 'related_anime') {
                setShowRelated(showRelated + 5);
            } else if (showRecommended + 5 < data['recommendations'].length && type === 'recommendations') {
                setShowRecommended(showRecommended + 5);
            }
        }
    }

    useEffect(() => {
        fetchHandler();
        setShowRelated([0]);
        setShowRecommended([0]);
    }, [id]);

    return (
        <div >
            <Header currentPage={'Browse Lists'} />
            {data !== "" ?
                <>
                    <div style={styles.displayContainer} >
                        <div style={styles.mainImageConatiner} >
                            <img src={mainImg} alt="Main" style={styles.mainImage} ></img>
                            <div style={{ flexDirection: 'row', display: 'flex' }}>
                                <div onClick={() => { setMainImg(data['main_picture']['large']); }} >
                                    <img src={data['main_picture']['large']} alt="Other" style={styles.otherImage} />
                                </div>
                                {data['pictures'].map((pic, i) => {
                                    if (i < 3 && pic['large'] !== data['main_picture']['large']) {
                                        return (
                                            <div onClick={() => { setMainImg(pic['medium']); }} key={i} >
                                                <img src={pic['large']} alt="Other" style={styles.otherImage} />
                                            </div>
                                        )
                                    } else {return (<></>)}
                                })}
                            </div>
                        </div>
                        <div style={styles.infoContainer} >
                            <h2 style={{ color: '#444', marginTop: '0' }} > {data['title']} </h2>
                            <p style={{ fontSize: '8px', lineHeight: '0px', color: '#333' }} > Avg Rating </p>
                            <div style={{ flexDirection: 'row', display: 'flex', fontSize: '12px', color: '#FB9C26' }}>
                                <Rating
                                    style={styles.rating(true)} name="read-only" value={4} readOnly size='small'
                                    emptyIcon={<StarBorderIcon fontSize="inherit" style={{ color: '#FB9C26' }} />} />
                                {4.76}
                            </div>
                            <p style={{ fontSize: '8px', lineHeight: '0px', color: '#333' }} > Your Rating </p>
                            <div style={{ flexDirection: 'row', display: 'flex', fontSize: '12px', color: '#444' }}>
                                <Rating
                                    style={styles.rating(false)} name="simple-controlled" precision={0.25}
                                    size='small' value={ratingValue}
                                    emptyIcon={<StarBorderIcon fontSize="inherit" style={{ color: '#545454' }} />}
                                    onChange={(event, newValue) => { setRatingValue(newValue); }} />
                                {ratingValue}
                            </div>
                            <div style={{ flexDirection: 'row', display: 'flex' }}>
                                {data['genres'].map((genre, i) => {
                                    return (
                                        <div style={styles.genreContainer} key={i} >
                                            {genre['name']}
                                        </div>
                                    )
                                })}
                            </div>
                            <div style={styles.descContainer} className="descContainer" > {data['synopsis']} </div>
                        </div>
                    </div>
                    <div style={{margin: '5% 10%'}} >
                        <h2 style={{ color: '#444', marginTop: '0' }} > More From {data['title']}: </h2>
                        <div style={styles.recommendedContainer}>
                            <KeyboardArrowLeftIcon style={{fontSize: '50px', marginTop: '8%', marginRight: '5%'}}
                            onClick={() => {handleRelated('left', 'related_anime');}} />   
                            {data['related_anime'].slice(showRelated, showRelated+5).map((anime, i) => {
                                return (
                                    <div key={i} style={styles.recommendedListContainer} className="recommendedListContainer"
                                    onClick={() => {history.push(`/animeDisplay?id=${anime['node']['id']}`);}} >
                                        <img src={anime['node']['main_picture']['large']} alt="Recommended"
                                        style={styles.recommendedListImg} />
                                        <br/> {anime['node']['title']}
                                    </div>
                                )
                            })}
                            <KeyboardArrowRightIcon style={{fontSize: '50px', marginTop: '8%'}}
                            onClick={() => {handleRelated('right', 'related_anime');}} />   
                        </div>
                    </div>
                    <div style={{margin: '5% 10%'}} >
                        <h2 style={{ color: '#444', marginTop: '0' }} > Recommended Anime: </h2>
                        <div style={styles.recommendedContainer}>
                            <KeyboardArrowLeftIcon style={{fontSize: '50px', marginTop: '8%', marginRight: '5%'}}
                            onClick={() => {handleRelated('left', 'recommendations');}} />   
                            {data['recommendations'].slice(showRecommended, showRecommended+5).map((anime, i) => {
                                return (
                                    <div key={i} style={styles.recommendedListContainer} className="recommendedListContainer"
                                    onClick={() => {history.push(`/animeDisplay?id=${anime['node']['id']}`);}} >
                                        <img src={anime['node']['main_picture']['large']} alt="Recommended"
                                        style={styles.recommendedListImg} />
                                        <br/> {anime['node']['title']}
                                    </div>
                                )
                            })}
                            <KeyboardArrowRightIcon style={{fontSize: '50px', marginTop: '8%'}}
                            onClick={() => {handleRelated('right', 'recommendations');}} />   
                        </div>
                    </div>
                </>
                : <></>}
        </div>
    );
}

const styles = {
    displayContainer: {
        margin: '5% 10%',
        flexDirection: 'row',
        display: 'flex'
    },
    mainImageConatiner: {
        flex: '1',
    },
    infoContainer: {
        flex: '5',
        marginLeft: '10%',
    },
    mainImage: {
        height: '45vmin',
        width: '30vmin',
        borderRadius: '15px',
        border: '1px solid #BBB'
    },
    otherImage: {
        width: '6.75vmin',
        height: '9vmin',
        borderRadius: '7.5px',
        marginTop: '20%',
        marginRight: '0.5vmin',
        border: '1px solid #BBB'
    },
    rating: isAverage => ({
        color: isAverage ? '#FB9C26' : '#545454',
        marginRight: '1%',
        marginBottom: '1.5%'
    }),
    genreContainer: {
        padding: '0.2% 2%',
        border: '2px solid #32CBBD',
        borderRadius: '20px',
        marginRight: '2%',
        color: '#32CBBD'
    },
    descContainer: {
        width: '75%',
        height: '28.5vmin',
        overflow: 'auto',
        marginTop: '3%',
        color: '#333',
        lineHeight: '25px',
    },
    recommendedContainer: {
        flexDirection: 'row', 
        display: 'flex', 
        justifyContent: 'center',
    },
    recommendedListContainer: {
        textAlign: 'center',
        marginRight: '10vmin',
        color: '#555',
        fontWeight: 'bold'
    },
    recommendedListImg: {
        height: '30vmin',
        width: '21vmin',
        borderRadius: '15px',
        border: '1px solid #BBB'
    }
}


export default AnimeDisplay;    