import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';

import { useHistory } from 'react-router-dom'

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    let history = useHistory();

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            history.push(`/animeSearch?q=${searchQuery}`);
        }
    }

    return (
        <div style={styles.mainContainer}>
            <SearchIcon style={styles.icon} />
            <input style={styles.container} placeholder="Search for Anime" type="text" size='40'
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={handleSearch} />
        </div>
    );
};

const styles = {
    mainContainer: {
        // marginLeft: '20%',
        flex: '5',
        textAlign: 'right'
    },
    container: {
        padding: "10px 60px",
        borderRadius: '100px',
        border: '1px solid #A4A4A4',
        outline: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.20)',
        color: '#CCCCCC'

    },
    icon: {
        position: "absolute",
        padding: '7px 15px',
        color: '#A4A4A4',
        textAlign: 'center'
    }
}

export default SearchBar;