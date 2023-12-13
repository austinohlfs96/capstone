
import {useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom';
import { Header, Segment, Button, Image, Sticky } from 'semantic-ui-react'
import { useSelector } from "react-redux"
import { logout } from '../features/coach/coachSlice'


function Head() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const coach = useSelector((state) => state.coach.data);



  const handleLogout = () => {
    //! No need to send a request to the API
    //! There is nothing our API can currently do to invalidate this token
    //! the frontend simply has to remove the tokenS (as in both of them) from localStorage 
    localStorage.removeItem("jwt_token")
    localStorage.removeItem("refresh_token")
    dispatch(logout())
    navigate("/")
    // alert("You have successfully logged out!")
 }
  
  return (
    <div className="App" >
    
        <Sticky >
      <Segment>
    <Header as='h3' textAlign='right'>
    {!coach && (
  <>
    <Button primary onClick={() => navigate('/login')}>Login</Button>
    <Button secondary onClick={() => navigate('/signup')}>Register</Button>
  </>
)}
    {coach && (
  <>
    <Button primary onClick={() => navigate('/userHome')}>Profile</Button>
    <Button secondary onClick={handleLogout}>Logout</Button>
  </>
)}
    </Header>
    <Header as='h3' textAlign='left'     marginTop= '-3px'>
    <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Valknut.svg/1200px-Valknut.svg.png' size='small' />
      Æsir Performance Tunes
    </Header>
    <Header as='h3' textAlign='center' marginTop= '10px'>
    <Button secondary onClick={() => navigate('/')}>About</Button>
    <Button secondary onClick={() => navigate('/services')}>Services</Button>
    <Button secondary>Gallery</Button>
    <Button secondary>Rider Spotlight</Button>
    <Button secondary onClick={() => navigate('/contact')}>Contact Us</Button>
    
    </Header>
  </Segment>
  </Sticky>
    </div>
  );
}

export default Head;