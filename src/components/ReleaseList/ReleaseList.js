import React from 'react';
import Release from '../Release/Release';
import './ReleaseList.styles.css';

const Releaselist = ({ releases, clickHandler, albumClick, releaseType }) => {
    if (releaseType) releases = releases[0].releases;
    else releases = releases[1].releases;
    return ( 
        <section className='release-container'>
            {
                releases.map((release) => {
                    return (
                        <Release key={release.uri} 
                            addClick={clickHandler} 
                            {...release}
                            albumClick={albumClick}
                            album={releaseType}/>
                    );
                })
            }
        </section>
    );
}

export default Releaselist;