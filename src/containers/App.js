import React from 'react';
import Header from '../components/Header';
import ReleaseList from '../components/ReleaseList';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      releases: [],
      searchfield: '',
      genre: ''
    }
  }

  componentDidMount() {
    const dummyReleases = [
      {
        name: 'The Smiths',
        album: 'Meat Is Murder',
        image: 'https://www.nme.com/wp-content/uploads/2016/10/254.TheSmiths_MeatIsMurder_141013-1.jpg'
      },
      {
        name: 'Amy Winehouse',
        album: 'Back To Black',
        image: 'https://www.nme.com/wp-content/uploads/2016/10/28.AmyWinehouse_Backtoblack_161013-2.jpg'
      },
      {
        name: 'Nirvana',
        album: 'Nevermind',
        image: 'https://www.nme.com/wp-content/uploads/2016/10/2014Nirvana_Nevermind_150414-2.jpg'
      },
      {
        name: 'Radiohead',
        album: 'Kid A',
        image: 'https://www.nme.com/wp-content/uploads/2016/10/114.Radiohead_KidA_151013.jpg'
      },
      {
        name: 'The Clash',
        album: 'London Calling',
        image: 'https://www.nme.com/wp-content/uploads/2016/10/39.clash_londoncalling_161014-1.jpg'
      },
      {
        name: 'The Smiths',
        album: 'Meat Is Murder',
        image: 'https://www.nme.com/wp-content/uploads/2016/10/254.TheSmiths_MeatIsMurder_141013-1.jpg'
      },
      {
        name: 'Amy Winehouse',
        album: 'Back To Black',
        image: 'https://www.nme.com/wp-content/uploads/2016/10/28.AmyWinehouse_Backtoblack_161013-2.jpg'
      },
      {
        name: 'Nirvana',
        album: 'Nevermind',
        image: 'https://www.nme.com/wp-content/uploads/2016/10/2014Nirvana_Nevermind_150414-2.jpg'
      },
      {
        name: 'Radiohead',
        album: 'Kid A',
        image: 'https://www.nme.com/wp-content/uploads/2016/10/114.Radiohead_KidA_151013.jpg'
      },
      {
        name: 'The Clash',
        album: 'London Calling',
        image: 'https://www.nme.com/wp-content/uploads/2016/10/39.clash_londoncalling_161014-1.jpg'
      },
    ];
    this.setState({releases: dummyReleases});

    window.addEventListener("scroll", this.shrinkHeaderOnScroll);
  
}
    
shrinkHeaderOnScroll = () => {
      const distanceY = window.pageYOffset || document.documentElement.scrollTop,
        shrinkOn = 50,
        header = document.getElementById("header");
  
      if (distanceY > shrinkOn) {
        header.classList.add("shrink");
      } else {
        header.classList.remove("shrink");
      }
}

  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value});
  }

  onSelectChange = (event) => {
    this.setState({genre: event.target.value});
  }

  render() {
    const { releases, searchfield} = this.state;
    const filteredReleases = releases.filter(release => {
      return release.name.toLowerCase().includes(searchfield.toLowerCase()) || 
        release.album.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !releases.length ? 
      <h1>Searching for new releases...</h1> :
        (
          <div className='container'>
            <Header/>
            <div className='content'>
              <ReleaseList releases={filteredReleases} /> 
            </div>
          </div>
        )
  };
}

export default App;
