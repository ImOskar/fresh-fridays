import React from 'react';
import './Release.css';

const Release = ({ artist, title, image}) => {
    return (
        <div className='album'>
            <div className='img-hov'>
                <img className='album__img' alt='album' src={image}/>
                <div className='album__link'>
                    <a className='spotify-link' href='https://open.spotify.com/artist/1SQRv42e4PjEYfPhS0Tk9E'>
                        Open in Spotify
                    </a>
               </div>
            </div>
                <div className='album__name'>
                    <span>{title}</span>
                    <span className='album__artist'>{artist}</span>
                </div>
        </div>
    )
}

export default Release;