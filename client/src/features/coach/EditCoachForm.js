import { useState, useCallback, useEffect } from 'react'
import { Grid, Menu, Segment, Button, Form, Input } from 'semantic-ui-react'
import {useSelector, useDispatch} from "react-redux"
import {setCurrentCoach, deleteCoach, addError, fetchCurrentUser} from "./coachSlice"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { getToken } from '../../utils/main';
import { checkToken } from '../../utils/main';


const EditCoachFormContent = () => {
  const navigate = useNavigate()
  const coach = useSelector((state) => state.coach.data)
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  

  const handleNewError = useCallback((error) => {
    addToast(error, { appearance: 'error', autoDismiss: true });
  }, [addToast])

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required'),
    team: Yup.string(),
    // profile_picture: Yup.string(),
  });

  const sendRequest = (values) => {
    // Check if the user is logged in before making the PATCH request
    if (!getToken() || !checkToken()) {
      handleNewError('User not logged in');
      // navigate('/')
      // Handle the case where the user is not logged in (redirect, show a message, etc.)
      return;
    }

    // Perform PATCH request to update coach on the backend
    fetch(`http://127.0.0.1:5555/coach/${coach.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // Include any necessary authentication headers (e.g., JWT token)
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((updatedCoach) => {
            dispatch(setCurrentCoach(updatedCoach));
          });
        } else {
          res.json().then((errorObj) => {
            dispatch(addError(errorObj.message));
            handleNewError(errorObj.message);
          });
        }
      });
  };
  
  const formik = useFormik({
    initialValues: {
      name: coach.name,
      email: coach.email,
      team: coach.team,
      profile_picture: coach.profile_picture,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      sendRequest(values)
     
      }})
 

  const handleDeleteClick = () => {
    const choice = prompt('Are you sure want to delete your account? This will delete all your athlete and appointment data. There is no coming back from this!\nType YES to continue.');
    if (!choice) {
      return;
    } else if (choice.toLowerCase() === 'yes') {
    navigate("/")
    fetch(`http://127.0.0.1:5555/coach/${coach.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Include any necessary authentication headers (e.g., JWT token)
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete coach');
        }
        return res.json();
      })
      .then(() => {
        handleNewError("Account deleted");
        dispatch(setCurrentCoach(null));
        localStorage.removeItem("jwt_token")
        localStorage.removeItem("refresh_token")
        dispatch(deleteCoach())
        
        
      })
      .catch((error) => {
        console.error('Error deleting coach:', error.message);
      });
    }
  };

  return (
    <Grid.Column stretched width={12}>
      <Segment>
        <Form onSubmit={formik.handleSubmit}>
          {/* Your form fields go here */}
          <Form.Field>
            <label>Edit Name</label>
            <Input
              name="name"
              placeholder="Enter your name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="error">{formik.errors.name}</div>
            )}
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <Input
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          </Form.Field>
          <Form.Field>
            <label>Team</label>
            <Input
              name="team"
              placeholder="Enter your team name"
              value={formik.values.team}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.team && formik.errors.team && (
              <div className="error">{formik.errors.team}</div>
            )}
          </Form.Field>
          <Form.Field>
            <label>Profile Photo</label>
            <Input
              name="profile_picture"
              placeholder="Enter img URL for picture"
              value={formik.values.profile_picture}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {/* {formik.touched.profile_picture && formik.errors.profile_picture && (
              <div className="error">{formik.errors.profile_picture}</div>
            )} */}
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
        <Button secondary onClick={handleDeleteClick}>DELETE Account</Button>
      </Segment>
    </Grid.Column>
  );
};

const EditCoachForm = () => {
  return (
    <ToastProvider>
      <EditCoachFormContent />
    </ToastProvider>
  );
};

export default EditCoachForm;