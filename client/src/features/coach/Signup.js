import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useState, useCallback } from 'react';
import { addError } from "./coachSlice";
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useToasts } from 'react-toast-notifications';
import Head from "../../components/Header";
import { Button, Checkbox, Form } from 'semantic-ui-react'

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { addToast } = useToasts();
  const [coach, setCoach] = useState(null)
  const updateCoach = (coach) => setCoach(coach)

  const handleNewError = useCallback((error) => {
    addToast(error, { appearance: 'error', autoDismiss: true });
  }, [addToast]);

  const formSchema = yup.object().shape({
    email: yup.string().required('Please enter your email').typeError('Please enter a string.'),
    password: yup.string().required('Please enter a password.').typeError('Please enter a string.'),
    confirmpassword: yup.string().required('Please enter the same password.').typeError('Please enter a string.'), 
    profile_picture: yup.string().url('Please enter a valid URL for the profile picture'),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      team: "",
      password: "",
      confirmpassword: "",
      profile_picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      console.log("val", values)
      if (values.password !== values.confirmpassword) {
        handleNewError("Password must match.");
        return;
      }
  
      try {
        fetch(`http://127.0.0.1:5555/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
  
        .then(res => {
          if (res.ok) {
              res.json().then(resObj => {
                updateCoach(resObj.coach)
                localStorage.setItem("jwt_token", resObj.token)
                localStorage.setItem("refresh_token", resObj.refresh_token)
              })
              navigate('/userhome');
          } else {
              res.json().then(errorObj => {
              dispatch(addError(errorObj.message));
              handleNewError(errorObj.message);
            });
          }
      })
      } catch (error) {
        console.error('An unexpected error occurred', error);
        handleNewError(error);
      }
    },
  });

  const handleInputChange = (e) => {
    const trimmedValue = e.target.value.trim();
    formik.handleChange(e);
    formik.setFieldValue(e.target.name, trimmedValue);

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
      </div>
  );

}


export default Signup;