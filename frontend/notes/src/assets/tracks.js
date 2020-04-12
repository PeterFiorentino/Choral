import drums from './drums.mp3'
import bass from './bassguitar.mp3'
import clav from './clav.mp3'
import guitar from './leadguitar.mp3'
import horns from './horns.mp3'

let track1 = {
    audio: drums,
    approved: true
}

let track2 = {
    audio: bass,
    approved: false
}

let track3 = {
    audio: horns,
    approved: false
}

let track4 = {
    audio: guitar,
    approved: false
}

let track5 = {
    audio: clav,
    approved: false
}

const tracks = [track1,track2,track3, track4, track5]

export default tracks