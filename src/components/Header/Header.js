import React from 'react';
import * as sFunc from '../../utils/spotifyApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import './Header.styles.css';

const Header = () => {
    return (
        <header id='header' className='header'>
            <div className='bg-gradient'></div>
            <div className='caption'>
                <h1 className='title'>[FRESH] Fridays</h1>
                <span className='subtitle bg-color'>Discover the latest hip-hop releases</span>
            </div>
            <a href={sFunc.getLoginPath()} className='spotify-login spotify-btn selectable'>Log in to Spotify
            </a>
            <span className='chevron selectable'>
                <a href='#content'>
                    <FontAwesomeIcon icon={faChevronDown} />
                </a>
            </span>
        </header>
    )
}

export default Header;