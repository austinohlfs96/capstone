// import MenuExampleTabularOnLeft from './NavBar'
// import { useNavigate } from 'react-router-dom'
// import {useDispatch, useSelector} from "react-redux"
// import {setCurrentCoach} from "./coachSlice"
// import { useEffect, useState, useCallback } from 'react'
// import AlertBar from '../../components/AlertBar'
// import Head from "../../components/Header"
// import { Image } from 'semantic-ui-react'
// import { ToastProvider, useToasts } from 'react-toast-notifications';


// const UserHome = () => {
  
//   const navigate = useNavigate()
//   const [error, setError] = useState("");
//   const dispatch = useDispatch()
//   const coach = useSelector((state) => state.coach.data)
//   // const [currentUser, setCurrentUser] = useState({})
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('');
//   // const [coach, setCoach] = useState(null)
//   console.log(coach)
//   // const updateCoach = (coach) => setCoach(coach)

//   // const handleNewError = useCallback((error) => {
//   //   setSnackbarOpen(true);
//   //   setSnackbarMessage(error);
//   //   setSnackbarSeverity('error');
//   // }, []);

//   // const handleNewError = useCallback((error) => {
//   //   setError(error);
//   // }, []);

  


//   useEffect(() => {
//     if (!coach) {
//       fetch("http://127.0.0.1:5555/auth/me",{
//         headers: {
//               Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
//             }
//       })
//       .then(res => {
//         if (res.ok) {
//           res.json().then(coach => dispatch(setCurrentCoach(coach)))
//         } else if (res.status === 422) {
//           fetch("http://127.0.0.1:5555/auth/refresh", {
//             method: "POST",
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('refresh_token')}`,
//             }
//           })
//           .then(res => {
//             if (res.ok) {
//               res.json().then(resObj => {
//                 dispatch(setCurrentCoach(resObj.coach))
//                 localStorage.setItem("jwt_token", resObj.jwt_token)
//               })
//             } else {
//               navigate("/")
//               handleNewError("You have been signed out please sing back in to use account services.")
//               res.json().then(errorObj => handleNewError(errorObj.msg))
//             }
//           })
//         } else {
//           res.json().then(errorObj => handleNewError(errorObj.message || errorObj.msg))
//         }
//       })
//       .catch(handleNewError)
//     }
//   }, [handleNewError, coach])




  

// console.log(coach)
//   const title = 'USER HOME'
//   return (
//     <div className='container'>
//       <Head coach={coach}/>
//       {/*  */}
      
//       {coach && (
//   <>
//   <Image src={coach.profile_picture} size='small' />
//     <h1>{coach.name}</h1>
//   </>
// )}
    
//         <MenuExampleTabularOnLeft/>
     
      
        
//     </div>
//   )
// }

// export default UserHome;

import MenuExampleTabularOnLeft from './NavBar'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {setCurrentCoach, addError} from "./coachSlice"
import { useEffect, useState, useCallback } from 'react'
import AlertBar from '../../components/AlertBar'
import Head from "../../components/Header"
import { Image } from 'semantic-ui-react'
import { ToastProvider, useToasts } from 'react-toast-notifications';


const UserHome = () => {
  
  const navigate = useNavigate()
  const [error, setError] = useState("");
  const dispatch = useDispatch()
  const { addToast } = useToasts();
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
  <Image src={coach.profile_picture} size='small' />
    <h1>{coach.name}</h1>
  </>
)}
      <MenuExampleTabularOnLeft/>
        
    </div>
  )
}

export default UserHome;