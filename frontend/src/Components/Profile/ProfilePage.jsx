import React,{Component} from 'react'
import NavBar from '../NavBar/NavBar.jsx'
import axios from 'axios'
import './Profile.css'

class ProfilePage extends Component {
    constructor(props){
        super(props)
        this.state = {
           loggedUser: {
               id: 1,
               username: '',
               email: '',
               avatar: '',
           },
        }
    }
    componentDidMount = () => {
        this.fetchUserData()
    }
    fetchUserData = async () => {
        const {loggedUser} = this.state
        console.log(loggedUser)
        try{
            const userData = await axios.get(`http://localhost:3001/users/${loggedUser.id}`)
            console.log(userData)
            // this.setState({
            //     username: 
            // })
        }catch(error){
            console.log('err =>', error)
        }  
    }

    render(){
        return(
            <div className='profile-page'>
                <NavBar />
                <h1 className='title'>Choral</h1>
                
            </div>
        )
    }
}



export default ProfilePage