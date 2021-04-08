import React, { useState, useEffect } from "react";
import Header from '../components/Header';

import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const AnimeSeatchList = () => {
    var searchQuery = 'one';
    const [searchList, setSearchList] = useState([]);
    const [offset, setOffset] = useState(1);

    const changePage = (arrow) => {
        console.log("THIS");
        if (arrow === 'back') {
            offset !== 1 ? setOffset(offset-1) : setOffset(1);
        } else {
            setOffset(offset+1)
        }
    }

    const fetchAnime = () => {
        fetch(`http://localhost:9000/search?anime=${searchQuery}&offset=${(offset-1)*10}`)
            .then(res => res.json())
            .then(res => {
                setSearchList(res);
                console.log(searchList);
            });
    }

    useEffect(() => {
        fetchAnime();
    }, [offset]);

    return (
        <div>
            <Header currentPage={'Browse Lists'} userName={'Dijkstrahul'} />
            <p style={styles.resultText}> Showing Results for "{searchQuery}" </p>
            {searchList !== [] ? <>
                <div style={styles.mainContainer}>
                    {searchList.map((anime, i) => {
                        return (
                            <div style={styles.listContainer(i == searchList.length-1)} key={i} >
                                <img src={anime['main_picture']['large']} alt="anime" style={styles.animeImg} 
                                onClick= {() => {console.log("HIII");}} className='animeImg' />
                                <div style={styles.animeInfoContainer} >
                                    <p style={styles.animeTitle} className='animeListingTitle' onClick= {() => {console.log("HIII");}}>
                                         {anime['title']} </p>
                                    <div style={styles.ratingContainer}>
                                        <Rating
                                            style={styles.rating(true)} name="read-only" value={4} readOnly size='small'
                                            emptyIcon={<StarBorderIcon fontSize="inherit" style={{ color: '#FB9C26' }} />} />
                                        (4.76 - 10,205 Reviews)
                                    </div>
                                    <p style={styles.animeFollowers} > 10,1562 Followers </p>
                                    <div style={styles.followeButton} className='followeButton' onClick= {() => {console.log("BYEEE");}} >
                                        <p style={{marginRight: '5%', fontSize: '15px'}} >Follow Page</p>
                                        <PersonAddIcon style={{ fontSize: '20px' }} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center'}} >
                        <KeyboardArrowLeftIcon style={styles.pageChange} onClick={() => {changePage('back');}} className='pageChange' /> 
                        <div style={{fontSize: '22px'}} > {offset} </div>
                        <KeyboardArrowRightIcon style={styles.pageChange} onClick={() => {changePage('next');}} className='pageChange' />
                    </div>
                </div>
            </>
                : <></>}
        </div>
    )
}

const styles = {
    mainContainer: {
        margin: '5% 0%',
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center'
    },
    resultText: {
        margin: '5% 10% 0% 10%',
        textAlign: 'center',
        fontWeight: '600',
        color: '#444',
        fontSize: '18px'
    },
    listContainer: isLast => ({
        flexDirection: 'row',
        display: 'flex',
        width: '60%',
        paddingBottom: '5%',
        marginBottom: '5%',
        borderBottom: isLast ? '0' : '0.5px solid #A6A6A6'
    }),
    animeImg: {
        height: '30vmin',
        width: '20vmin',
        borderRadius: '15px'
    },
    ratingContainer: {
        alignItems: 'center',
        flexDirection: 'row', 
        display: 'flex', 
        fontSize: '10px', 
        color: '#444444', 
        width: '40vmin',
        fontWeight: '600' 
    },
    rating: isAverage => ({
        color: isAverage ? '#FB9C26' : '#545454',
        marginRight: '5%',
        marginBottom: '1.5%'
    }),
    animeInfoContainer: {
        marginLeft: '7%',
    }, 
    animeTitle: {
        fontSize: '19px',
        fontWeight: 'bold',
        color: '#444444'
    },
    animeFollowers: {
        fontSize: '14px',
        color: '#444444',
        fontWeight: '500'
    }, 
    followeButton: {
        width: '20vmin',
        height: '5.5vmin',
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#3C3C3C',
        color: '#FFFFFF',
        justifyContent: 'center',
        borderRadius: '30px',
        marginTop: '15%'
    }, 
    pageChange: {
        fontSize: '40px',
        margin: '0 5%'
    }
}

export default AnimeSeatchList;