import { useNavigate } from 'react-router-dom';
import { useState,useCallback } from 'react';
import { useSelector, useDispatch} from "react-redux"
import {setCurrentCoach, addErrors} from "./coachSlice"
import { useFormik } from "formik";
import * as yup from "yup";
// import AlertBar from '../../components/AlertBar'
import Head from "../../components/Header";
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const errors = useSelector(state => state.errors)
  
  const [error, setError] = useState("");
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [alertMessage, setAlertMessage] = useState(null);
  const [snackType, setSnackType] = useState('');
  // const [coach, setCoach] = useState(null)

  // const updateCoach = (coach) => setCoach(coach)

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
                // updateCoach(resObj.coach)
                dispatch(setCurrentCoach(resObj.coach))
                localStorage.setItem("jwt_token", resObj.token)
                localStorage.setItem("refresh_token", resObj.refresh_token)
              })
              navigate('/userhome');
          } else {
              res.json().then(errorObj => dispatch(addErrors(errorObj.message)))
          }
      })
      .catch(error => dispatch(addErrors(error)))
  },
})





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
        
    </div>  
  )
}

export default Login;