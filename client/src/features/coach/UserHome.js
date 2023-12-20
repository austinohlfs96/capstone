import MenuExampleTabularOnLeft from './NavBar'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {setCurrentCoach, addError} from "./coachSlice"
import { useEffect, useCallback } from 'react'
import Head from "../../components/Header"
import { Image, Sticky } from 'semantic-ui-react'
import { useToasts } from 'react-toast-notifications';

const UserHome = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { addToast } = useToasts();
  const coach = useSelector((state) => state.coach.data)
  const handleNewError = useCallback((error) => {
    addToast(error, { appearance: 'error', autoDismiss: true });
  }, [addToast]);

  useEffect(() => {
    if (!coach) {
      fetch("http://127.0.0.1:5555/auth/me",{
        headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
            }
      })
      .then(res => {
        if (res.ok) {
          res.json().then(coach => dispatch(setCurrentCoach(coach)))
        } else if (res.status === 422) {
          fetch("http://127.0.0.1:5555/auth/refresh", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem('refresh_token')}`,
            }
          })
          .then(res => {
            if (res.ok) {
              res.json().then(resObj => {
                dispatch(setCurrentCoach(resObj.coach))
                localStorage.setItem("jwt_token", resObj.jwt_token)
              })
            } else {
              
              res.json().then(errorObj => {
                navigate('/')
                dispatch(addError(errorObj.message));
                handleNewError("You have been signed out please sign in to use account services");
              });
            }
          })
        } else {
          res.json().then(errorObj => handleNewError(errorObj.message || errorObj.msg))
        }
      })
      .catch(error => {
        dispatch(addError(error));
        handleNewError(error);
      });
    }
  }, [handleNewError, coach])

console.log(coach)
  const title = 'USER HOME'
  return (
    <div className='container'>
      <Head coach={coach}/>
      {/*  */}
      
      
      {coach && (
  <>

  <Image src={coach.profile_picture} size ='small' style={{margin: '15px'}}/>
  <h1 style={{ color: 'white' }}>{coach.name}</h1>
  <h2 style={{ color: 'white' }}>Team: {coach.team}</h2>

  </>
)}
      <MenuExampleTabularOnLeft/>
      
    </div>
  )
}

export default UserHome;