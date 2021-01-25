import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import './Release.styles.css';

const Release = ({ artist, title, image, url, uri, tracks, addClick, albumClick, album}) => {
    return (
        <div className='album'>
            <div className='img-hov'>
                <img className='album-img' alt='album' src={image}/>
                <div className='album-link'>
                    <a className='btn' title="Open in Spotify" href={url}>
                        <FontAwesomeIcon className='link-margin spotify-link' icon={faSpotify} />
                    </a>
                    {album ? (
                            <button className='add-btn btn' title="Open tracklist" 
                                onClick={() => albumClick({artist, title, tracks: tracks})}>
                                <FontAwesomeIcon className='link-margin' icon={faPlusCircle} />
                            </button>
                            ) : 
                            (
                            <button className='add-btn btn' title="Add to playlist" 
                                onClick={() => addClick(artist, title, uri)}>
                                <FontAwesomeIcon className='link-margin' icon={faPlusCircle} />
                            </button>)
                    }             
               </div>
            </div>
            <div className='album-name'>
                <span className='album-title'>{title}</span>
                <span className='album-artist'>{artist}</span>
            </div>
        </div>
    )
}

export default Release;