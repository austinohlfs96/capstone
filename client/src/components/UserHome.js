import MenuExampleTabularOnLeft from './NavBar'
// import Header from './Header'
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
  const [user, setUser] = useState(null)

  const updateUser = (user) => setUser(user)

  useEffect(() => {
    setSnackbarOpen(false)
  }, [])

  const handleNewError = useCallback((error) => {
    setError(error);
  }, []);

  useEffect(() => {
    if (!user) {
      fetch("http://127.0.0.1:5555/me")
      .then(res => {
        if (res.ok) {
          res.json().then(updateUser)
        } else {
          res.json().then(errorObj => handleNewError(errorObj.message))
        }
      })
      .catch(handleNewError)
    } 
  }, [handleNewError, user])

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
      <h1>{currentUser.name}</h1>
      <MenuExampleTabularOnLeft/>
      {/* <Header title={title} />
      <NavBar />
      <div className='homeContent'>
        <h1>{currentUser.name}'s Datesmith Homepage</h1>
        <img className='picture' src={currentUser.profile_picture} alt='user_photo'></img>
        <h2>Age: {currentUser.age}</h2>
        <h3>Gender: {currentUser.gender}</h3>
        <h3>Location: {currentUser.location}</h3>
        <p>{currentUser.bio}</p>
        <button id='deleteProfile' onClick={handleDelete}>DELETE MY PROFILE</button>
        <AlertBar
          message={snackbarMessage}
          setAlertMessage={setSnackbarMessage}
          snackType={snackbarSeverity}
          handleSnackType={setSnackbarSeverity}
          onClose={handleCloseSnackbar}
        />
      </div> */}
    </div>
  )
}

export default UserHome;