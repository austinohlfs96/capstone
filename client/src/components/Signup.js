import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik'
import * as yup from 'yup'
import AlertBar from './AlertBar'
import Head from "./Header";
import { Button, Checkbox, Form } from 'semantic-ui-react'

const Signup = () => {
  const navigate = useNavigate()
  
  

  const [newUser, setNewUser] = useState({})
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  

  useEffect(() => {
    setSnackbarOpen(false)
  }, [])

  const formSchema = yup.object().shape({
    email: yup.string().required('Please enter your email').typeError('Please enter a string.'),
    password: yup.string().required('Please enter a password.').typeError('Please enter a string.'),
    confirmpassword: yup.string().required('Please enter the same password.').typeError('Please enter a string.'), 
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      team: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      if (values.password !== values.confirmpassword) {
        setSnackbarMessage("Password must match.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
  
      try {
        const response = await fetch(`http://127.0.0.1:5555/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
  
        if (response.ok) {
          const data = await response.json();
          const token = data.token;
  
          // Save the token to local storage or cookies
          localStorage.setItem('authToken', token);
  
          // Redirect to the userhome page
          navigate('/userhome');
        } else {
          setSnackbarMessage('User cannot be created.');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.error('An unexpected error occurred', error);
        setSnackbarMessage('An unexpected error occurred.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    },
  });
  

  

  const handleInputChange = (e) => {
    const trimmedValue = e.target.value.trim();
    formik.handleChange(e);
    formik.setFieldValue(e.target.name, trimmedValue);

  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  
  return (
    <div className='modal'>
      <Head/>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Field>
          <label>Email</label>
          <input className='signup'
          id='email'
          name="email"
          onChange={handleInputChange}
          value={formik.values.email}
          placeholder="Enter Email"
          required="true"
        />
        </Form.Field>
        <Form.Field>
          <label>Name</label>
          <input className='signup'
          id='name'
          name="name"
          onChange={handleInputChange}
          value={formik.values.name}
          placeholder="Enter Name"
          required="true"
        />
        </Form.Field>
        <Form.Field>
          <label>Team</label>
          <input className='signup'
          id='team'
          name="team"
          onChange={handleInputChange}
          value={formik.values.team}
          placeholder="Enter team"
          required="true"
        />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input className='signup'
          id='password'
          name="password"
          type="password"
          onChange={handleInputChange}
          value={formik.values.password}
          placeholder="Enter Password"
          required="true"
        />
        </Form.Field>
        <Form.Field>
          <label>Confirm Password</label>
          <input className='signup'
          id='confirmpassword'
          name="confirmpassword"
          type="password"
          onChange={handleInputChange}
          value={formik.values.confirmpassword}
          placeholder="Confirm Password"
          required="true"
        />
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
        <Button type='submit' onClick={() => navigate('/')}>Cancel</Button>
      </Form>
      {/* <form id='signupForm' onSubmit={formik.handleSubmit}>
        <h1 className='modaltitle'>Register New User</h1>
        <h3 className='modaltag'>Please enter your email and password.</h3>
        <div className='signupInput'>
        <input className='signup'
          id='email'
          name="email"
          onChange={handleInputChange}
          value={formik.values.email}
          placeholder="Enter Email"
          required="true"
        />
        <input className='signup'
          id='name'
          name="name"
          onChange={handleInputChange}
          value={formik.values.name}
          placeholder="Enter name"
          required="true"
        />
        <input className='signup'
          id='team'
          name="team"
          onChange={handleInputChange}
          value={formik.values.team}
          placeholder="Enter team"
          required="true"
        />
        <input className='signup'
          id='password'
          name="password"
          type="password"
          onChange={handleInputChange}
          value={formik.values.password}
          placeholder="Enter Password"
          required="true"
        />
        <input className='signup'
          id='confirmpassword'
          name="confirmpassword"
          type="password"
          onChange={handleInputChange}
          value={formik.values.confirmpassword}
          placeholder="Confirm Password"
          required="true"
        />
        </div>
        <div id='loginButtons'>
          <button className='modalbutton' type='submit'>Sign Up</button>
          <button className='modalbutton' onClick={() => navigate('/')}>Cancel</button>
          
        </div>
      </form> */}
      <AlertBar
          message={snackbarMessage}
          setAlertMessage={setSnackbarMessage}
          snackType={snackbarSeverity}
          handleSnackType={setSnackbarSeverity}
          onClose={handleCloseSnackbar}
      />
      </div>
  );

}

export default Signup;