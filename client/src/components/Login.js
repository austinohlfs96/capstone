import { useNavigate } from 'react-router-dom';
import { useState,useCallback } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import AlertBar from './AlertBar'
import Head from "./Header";
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'

const Login = () => {
  const navigate = useNavigate()
  
  const [error, setError] = useState("");
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [alertMessage, setAlertMessage] = useState(null);
  const [snackType, setSnackType] = useState('');
  const [coach, setCoach] = useState(null)

  const updateCoach = (coach) => setCoach(coach)

  const formSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required("Please enter an email."),
    password: yup.string().required("Please enter a password.").min(5)
  })
  
  const handleNewError = useCallback((error) => {
    setError(error);
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch('http://127.0.0.1:5555/auth/login', {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
      })
      .then(res => {
          if (res.ok) {
              res.json().then(resObj => {
                updateCoach(resObj.coach)
                localStorage.setItem("jwt_token", resObj.token)
              })
              navigate('/userhome');
          } else {
              res.json().then(errorObj => handleNewError(errorObj.message))
          }
      })
      .catch(handleNewError)
  },
})



// const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     validationSchema: formSchema,
//     onSubmit: async (values) => {
//       try {
//         const res = await fetch('http://127.0.0.1:5555/auth/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(values, null, 2),
//         });

//         if (res.ok) {
//           const data = await res.json(); // Assuming the server sends back a JSON object with a token property
//           const token = data.jwt_token;
//           console.log(data)
//           // Save the token to local storage or cookies
//           localStorage.setItem('authToken', token);

//           // Redirect to the userhome page
//           navigate('/userhome');
//         } else if (res.status === 401) {
//           alert('Invalid credentials');
//         } else {
//           alert('An error occurred');
//         }
//       } catch (error) {
//         console.error('An unexpected error occurred', error);
//         alert('An unexpected error occurred');
//       }
//     },
//   });
  

  // const handleLogin = () => {
  //   const data = {
  //     "email": email,
  //     "password": pass
  //   };

  //   fetch(`/login`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   })
  //   .then((res) => {
  //     if (res.ok) {
  //       localStorage.setItem('user_active', 'true');
  //       navigate('/userhome');
  //     } else {
  //       // Display an error message using the AlertBar
  //       setAlertMessage('Invalid user credentials.');
  //       setSnackType('error');
  //     }
  //   })
  //   .catch((error) => {
  //     // Handle other errors (e.g., network issues)
  //     console.error('Login failed:', error);
  //     setAlertMessage('Login failed. Please try again.');
  //     setSnackType('error');
  //   });
  // };

  return (
      <div className='modal'>
        <Head/>
        <Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>
      <Grid.Column>
        <Form onSubmit={formik.handleSubmit} id='formikLogin'>
          <Form.Input
            label="Email"
            id='email' 
            className='loginInput' 
            type='text' 
            onChange={formik.handleChange} 
            value={formik.values.email} 
            placeholder="Enter Email"
          />
          <Form.Input
            label="Password"
            id='password' 
            className='loginInput' 
            type='password' onChange={formik.handleChange} 
            value={formik.values.password} 
            placeholder="Enter Password"
          />

          <Button content='Login' type="submit" primary />
        </Form>
      </Grid.Column>

      <Grid.Column verticalAlign='middle'>
        <Button content='Sign up' icon='signup' size='big' onClick={() => navigate('/signup')} />
      </Grid.Column>
    </Grid>

    <Divider vertical>Or</Divider>
  </Segment>
        {/* <form onSubmit={formik.handleSubmit} id='formikLogin'>
          <h1 className='modaltitle'>Login</h1>
          <h3 className='modaltag'>Please enter your email and password.</h3>
          <input id='email' className='loginInput' type='text' onChange={formik.handleChange} value={formik.values.email} placeholder="Enter Email"></input>
          <input id='password' className='loginInput' type='password' onChange={formik.handleChange} value={formik.values.password} placeholder="Enter Password"></input>
          <div id='loginButtons'>
            <button className='modalbutton' type='submit'>Login</button>
            <button className='modalbutton' onClick={() => navigate('/')}>Cancel</button>
        {alertMessage && (
        <AlertBar
          message={alertMessage}
          setAlertMessage={setAlertMessage}
          snackType={snackType}
          handleSnackType={setSnackType}
        />
      )}
      </div>
      </form> */}
    </div>  
  )
}

export default Login;