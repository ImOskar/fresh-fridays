import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import './PlaylistItem.styles.css'

const PlaylistItem = ({artist, title, uri, clickHandler}) => {
    return (
        <tr className='playlist-item' key={uri}>
            <td className='item-title'>{title}</td>
            <td className='item-artist'>{artist}</td>
            <td className='item-remove'>
                <button onClick={() => clickHandler(uri)} className='svg-button remove-btn btn'>
                    <FontAwesomeIcon className='svg-button' icon={faMinusCircle} />
                </button>
            </td>
        </tr>
    )
}

export default PlaylistItem;