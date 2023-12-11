import MenuExampleTabularOnLeft from './NavBar'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import AlertBar from './AlertBar'
import Head from "./Header"
import { Image } from 'semantic-ui-react'

const UserHome = () => {
  
  const navigate = useNavigate()
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState({})
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [coach, setCoach] = useState(null)
  console.log(coach)
  const updateCoach = (coach) => setCoach(coach)

  useEffect(() => {
    setSnackbarOpen(false)
  }, [])

  const handleNewError = useCallback((error) => {
    setError(error);
  }, []);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    console.log(value)
  }


  useEffect(() => {
    if (!coach) {
      fetch("http://127.0.0.1:5555/auth/me",{
        headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
            }
      })
      .then(res => {
        if (res.ok) {
          res.json().then(updateCoach)
        } else if (res.status === 401) {
          fetch("http://127.0.0.1:5555/auth/refresh", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
            }
          })
          .then(res => {
            if (res.ok) {
              res.json().then(updateCoach)
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

//   useEffect(() => {
// // Make a request to the backend with the token in the headers
// fetch('http://127.0.0.1:5555/auth/me')
//   .then(response => response.json())
//   .then(data => {console.log(data)
//     // Use the user information from the response
//     setCurrentUser(data)
//     console.log('Current User:', data);
//   })
//   .catch(error => {
//     console.error('Error fetching current user:', error);
//   });
// }, []);
// console.log()


  const handleDelete = () => {
    const choice = prompt('Are you sure? There is no coming back from this!\nType YES to continue.');
    if (!choice) {
      return;
    } else if (choice.toLowerCase() === 'yes') {
      const id = currentUser.id;
      fetch(`/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(() => {
          setSnackbarMessage('Account deleted! We wish you the best.');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          return Promise.resolve();
        })
        .then(() => {
          navigate('/');
        })
        .catch(error => {
          setSnackbarMessage(`Error deleting account: ${error.message}`);
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };


  const title = 'USER HOME'
  return (
    <div className='container'>
      <Head/>
      {/*  */}
      <Image src={currentUser.profile_picture} size='small' />
      {coach && (
  <>
    <h1>{coach.name}</h1>
  </>
)}
      <MenuExampleTabularOnLeft/>
        
    </div>
  )
}

export default UserHome;