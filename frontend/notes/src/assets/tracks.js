import drums from './drums.mp3'
import bass from './bassguitar.mp3'
import clav from './clav.mp3'
import guitar from './leadguitar.mp3'
import horns from './horns.mp3'

let track1 = {
    audio: drums,
    approved: 'always'
}

let track2 = {
    audio: bass,
    approved: 'no'
}

let track3 = {
    audio: horns,
    approved: 'no'
}

let track4 = {
    audio: guitar,
    approved: 'no'
}

let track5 = {
    audio: clav,
    approved: 'no'
}

const tracks = [track1,track2,track3, track4, track5]

export default tracks