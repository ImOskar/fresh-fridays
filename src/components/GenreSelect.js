import React from 'react';

const GenreSelect = ({ selectChange }) => {
    return (
        <div>
            <select onChange={selectChange}>
                <option value="rap">Hip-hop/rap</option>
                <option value="rnb">Rnb</option>
                <option value="pop">Pop</option>
            </select>
        </div>
    )
}

export default GenreSelect;