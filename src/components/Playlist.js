import React from 'react'
import PropTypes from 'prop-types'
import './styles/Playlist.css';

import Track from './Track';

class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tracks: this.props.tracks
    }
  }

 calculatePlayTime = (tracks) => {
    let minutes = 0;
    let seconds = 0;
    tracks.forEach((track) => {
      const times = track.playtime.split(':');
      minutes += parseInt(times[0]);
      seconds += parseInt(times[1]);
    });
  
    minutes += Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
  
    seconds %= 60;
    minutes %= 60;
  
    seconds = ("" + seconds).padStart(2, "0");
    minutes = ("" + minutes).padStart(2, "0");
  
    return `${hours}:${minutes}:${seconds}`;
  }

  playtime = calculatePlayTime(this.props.tracks)

  render () {

    const trackElements = this.state.tracks.map((track, i) => {
      // We use "spread syntax" here to pass in all the properties of 
      // the variable 'track' as props. Go look it up!
      return (<Track
                key={track.id}
                {...track}
              />);
      });

      

    return (
      <div className="playlist">
        <h2>{this.props.side} Playlist</h2>
        <p>
          {this.props.trackCount} tracks - {playtime}
        </p>
        <ul className="playlist--track-list">
          {this.props.trackElements}
        </ul>
      </div>
    );
    
  }
}

Playlist.propTypes = {
  tracks: PropTypes.array,
  side: PropTypes.string,
}

export default Playlist;
