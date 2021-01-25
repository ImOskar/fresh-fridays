import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import './Tracklist.styles.css';

const Tracklist = ( {list, clickHandler, albumClick } ) => {
    const artist = list.artist;
    return (
        <div className='tracklist'>
            <button onClick={() => albumClick()} className='btn'>
                <FontAwesomeIcon className='close-btn' icon={faTimes} />
            </button>
            <table>
                <thead className='tracklist-header'>
                    <tr>
                        <td>{artist + ' - ' + list.title}</td>
                    </tr>
                </thead>
                <tbody>
                    {
                    list.tracks.map(track => {
                        return (
                            <tr className='tracklistlist-item' key={track.uri}>
                                <td className='tracklist-title'>{track.title}</td>
                                <td className='tracklistlist-add'>
                                    <button onClick={() => clickHandler(artist, track.title, track.uri )} className='add-btn btn'>
                                        <FontAwesomeIcon className='add-svg' icon={faPlusCircle} />
                                    </button>
                                </td>
                            </tr>        
                        );
                    })
                    }
                </tbody>   
            </table>
        </div>
    );

}

export default Tracklist;