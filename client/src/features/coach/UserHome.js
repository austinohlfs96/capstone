import MenuExampleTabularOnLeft from './NavBar'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {setCurrentCoach} from "./coachSlice"
import { useEffect, useState, useCallback } from 'react'
import AlertBar from '../../components/AlertBar'
import Head from "../../components/Header"
import { Image } from 'semantic-ui-react'


const UserHome = () => {
  
  const navigate = useNavigate()
  const [error, setError] = useState("");
  const dispatch = useDispatch()
  const coach = useSelector((state) => state.coach.data)
  // const [currentUser, setCurrentUser] = useState({})
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  // const [coach, setCoach] = useState(null)
  console.log(coach)
  // const updateCoach = (coach) => setCoach(coach)

  useEffect(() => {
    setSnackbarOpen(false)
  }, [])

  const handleNewError = useCallback((error) => {
    setError(error);
  }, []);

  


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
              res.json().then(errorObj => handleNewError(errorObj.msg))
            }
          })
        } else {
          res.json().then(errorObj => handleNewError(errorObj.message || errorObj.msg))
        }
      })
      .catch(handleNewError)
    }
  }, [handleNewError, coach])




  // const handleDelete = () => {
  //   const choice = prompt('Are you sure? There is no coming back from this!\nType YES to continue.');
  //   if (!choice) {
  //     return;
  //   } else if (choice.toLowerCase() === 'yes') {
  //     const id = currentUser.id;
  //     fetch(`/users/${id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //       .then(() => {
  //         setSnackbarMessage('Account deleted! We wish you the best.');
  //         setSnackbarSeverity('success');
  //         setSnackbarOpen(true);
  //         return Promise.resolve();
  //       })
  //       .then(() => {
  //         navigate('/');
  //       })
  //       .catch(error => {
  //         setSnackbarMessage(`Error deleting account: ${error.message}`);
  //         setSnackbarSeverity('error');
  //         setSnackbarOpen(true);
  //       });
  //   }
  // };

  // const handleCloseSnackbar = () => {
  //   setSnackbarOpen(false);
  // };

console.log(coach)
  const title = 'USER HOME'
  return (
    <div className='container'>
      <Head coach={coach}/>
      {/*  */}
      
      {coach && (
  <>
  <Image src={coach.profile_picture} size='small' />
    <h1>{coach.name}</h1>
  </>
)}
      <MenuExampleTabularOnLeft/>
        
    </div>
  )
}

export default UserHome;