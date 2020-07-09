import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class ReefInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hideInfo: false,
            toggle: 'show'
        }
    }

    toggleInfo = () => {
        if (this.state.toggle === 'show') {
            this.setState({
                hideInfo: !this.state.hideInfo,
                toggle: 'hide'
            })
        } else {
            this.setState({
                hideInfo: !this.state.hideInfo,
                toggle: 'show'
            })
        }
    }

    render() {
        let specificInfo = this.state.hideInfo ? (
            <div className='specific-info'>
                <div id='genre'>
                    <label htmlFor='genre'><b>Genre</b></label>
                    <p name='genre'>{this.props.genre}</p>
                </div>
                <p id='bpm'><b>{this.props.bpm} BPM</b></p>
                <div id='key'>
                    <label htmlFor='key'><b>Key</b></label>
                    <p name='key'>{this.props.reef_key}</p>
                </div>
                <div id='chords'>
                    <label htmlFor='chords'><b>Chord Progression</b></label>
                    <p name='chords'>{this.props.chord_progression}</p>
                </div>
            </div>
        ): <> </>

        return (
            <div className='info'>
                <h2>{this.props.reef_name}</h2>
                <h3>by <Link to={`/profile/${this.props.owner_id}`}><h3 id='profile-link'>{this.props.username}</h3></Link></h3>
                <h5 id='looking-for'>Looking for {this.props.looking_for}</h5>
                <div id='specific-info'>
                    {specificInfo}
                    <p onClick={this.toggleInfo}>{this.state.toggle} info</p>
                </div>
            </div>
        )
    }
}

export default ReefInfo