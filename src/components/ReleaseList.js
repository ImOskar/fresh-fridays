import React from 'react';
import Release from './Release';
import './ReleaseList.css';

const Releaselist = ({ releases }) => {
    return ( 
        <div className='release-container'>
            {
                releases.map((release, i) => {
                    return (
                        <Release
                           key={i}
                           artist={releases[i].name} 
                           title={releases[i].album}
                           image={releases[i].image}
                        />
                    );
                })
            }
        </div>
    );
}

export default Releaselist;