import React, {Component} from 'react'
import './Collaborators.css'
import Navigation from '../Navigation/Navigation.jsx'
import axios from 'axios'


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
        try{
            let response = await axios.get(`/api/collaborations/collaborators/${loggedUser}`)
            let collabArr = response.data.payload
            let collabObj = {}
            for(let i of collabArr) {
                if(!collabObj[i.username]) {
                    collabObj[i.username] = i.avatar
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
                {Object.keys(collaborators).map(collab => {
                    return(
                        <div>
                            <img src={collaborators[collab]}></img>
                            <p>{collab}</p>
                        </div>                   
                    )
                })}
                    
                    
            </div>
        )
    }
}



export default Collaborators