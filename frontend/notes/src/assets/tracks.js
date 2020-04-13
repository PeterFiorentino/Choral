import drums from './drums.mp3'
import bass from './bassguitar.mp3'
import clav from './clav.mp3'
import guitar from './leadguitar.mp3'
import horns from './horns.mp3'

let track1 = {
    audio: drums,
    approved: true,
    time: '0'
}

let track2 = {
    audio: bass,
    approved: false,
    time: '0'
}

let track3 = {
    audio: horns,
    approved: false,
    time: '0'
}

let track4 = {
    audio: guitar,
    approved: false,
    time: '0'
}

let track5 = {
    audio: clav,
    approved: false,
    time: '0'
}

const tracks = [track1,track2,track3, track4, track5]

export default tracks