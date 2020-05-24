import React, {Component} from 'react'
import './Collaborators.css'
import Navigation from '../Navigation/Navigation.jsx'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Collaborators extends Component {
    constructor(props){
        super(props)
        this.state = {
            loggedUser: props.user,
            collaborators: {}
        }
    }

    componentDidMount = () => {
        this.getCollaborators()
    }

    getCollaborators = async () => {
        
        const {loggedUser} = this.state;
        console.log(loggedUser)
        try{
            let response = await axios.get(`/api/collaborations/collaborators/${loggedUser}`)
            let collabArr = response.data.payload
            let collabObj = {}
            console.log(collabArr)
            for(let i of collabArr) {
                if(!collabObj[i.username]) {
                    collabObj[i.username] = [i.id, i.avatar]
                }
            }
            this.setState({
                collaborators: collabObj
            })
        } catch (error) {
            console.log("err => ", error)
        }
    }

    render(){
        let {collaborators} = this.state
        return(
            <div>
                <Navigation />

                <h1>Collaborators</h1>
                <div id="allCollabs">
                    {Object.keys(collaborators).map(collab => {
                        return(
                            <div>
                                <img src={collaborators[collab][1]} className="collabPics"></img>
                                <Link to={`/profile/${collaborators[collab][0]}`}><p className="collabName">{collab}</p></Link>
                            </div>                   
                        )
                    })} 
                </div>                  
            </div>
        )
    }
}



export default Collaborators