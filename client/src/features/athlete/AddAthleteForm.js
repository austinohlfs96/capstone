import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Segment, Button, Form, Input } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { addAthleteToCoach, addError, fetchCurrentUser } from '../coach/coachSlice';
import { addErrors } from './AthleteSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { getToken } from '../../utils/main';
import { checkToken } from '../../utils/main';




const AddAthleteFormContent = ({handleItemClick, athlete}) => {
  const coachId = useSelector((state) => state.coach.data.id);
  const dispatch = useDispatch()
  const { addToast } = useToasts();
  const handleNewError = useCallback((error) => {
    addToast(error, { appearance: 'error', autoDismiss: true });
  }, [addToast]);

  const initialValues = {
    name: '',
    age: '',
    height: '',
    weight: '',
    gender: '',
    boot_size: '',
    stance: '',
    discipline: '',
    profile_picture: '',
  };

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    age: Yup.string().required('Age is required'),
    height: Yup.string().required('Height is required'),
    weight: Yup.string().required('Weight is required'),
    gender: Yup.string().required('Gender is required'),
    boot_size: Yup.string().required('Boot size is required'),
    stance: Yup.string(),
    discipline: Yup.string().required('Discipline is required'),
    // profile_picture: Yup.string().url('Invalid URL')
  });

  // const sendRequest = (values) => {
  //   // Check if the user is logged in before making the PATCH request
  //   if (!getToken() || !checkToken()) {
  //     handleNewError('User not logged in');
  //     // navigate('/')
  //     // Handle the case where the user is not logged in (redirect, show a message, etc.)
  //     return;
  //   }

  //   // Perform PATCH request to update coach on the backend
  //   const dataToSend = { ...values, coaches_id: coachId };

  //   const requestMethod = athlete ? 'PATCH' : 'POST';
  //   const apiUrl = athlete ? `http://127.0.0.1:5555/athlete/${athlete.id}` : 'http://127.0.0.1:5555/athletes';

  //   fetch(apiUrl, {
  //     method: requestMethod,
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(dataToSend),
  //   })
  //   .then(res => {
  //     if (res.ok) {
  //         res.json().then(createdAthlete => {
  //           dispatch(addAthleteToCoach(createdAthlete));
  //           handleItemClick(null, { name: 'athletes' });
  //         })
  //     } else {
  //         res.json().then(errorObj => {
  //           console.log("error", errorObj)
  //         dispatch(addError(errorObj.message));
  //         handleNewError(errorObj.message);
  //       });
  //     }
  //     })
  //   }

  const onSubmit = (values) => {
    if (!getToken() || !checkToken()) {
      handleNewError('User not logged in');
      // navigate('/')
      // Handle the case where the user is not logged in (redirect, show a message, etc.)
      return;
    }

    // Perform PATCH request to update coach on the backend
    const dataToSend = { ...values, coaches_id: coachId };

    const requestMethod = athlete ? 'PATCH' : 'POST';
    const apiUrl = athlete ? `http://127.0.0.1:5555/athlete/${athlete.id}` : 'http://127.0.0.1:5555/athletes';

    fetch(apiUrl, {
      method: requestMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
    .then(res => {
      if (res.ok) {
          res.json().then(createdAthlete => {
            dispatch(addAthleteToCoach(createdAthlete));
            handleItemClick(null, { name: 'athletes' });
          })
      } else {
          res.json().then(errorObj => {
            console.log("error", errorObj)
          dispatch(addError(errorObj.message));
          handleNewError(errorObj.message);
        });
      }
      })
    }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Grid.Column stretched width={12}>
    <Segment>
    <Form onSubmit={formik.handleSubmit}>
    <Form.Field>
            <label>Athlete Name</label>
            <Input
              name="name"
              placeholder="Enter athlete name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div style={{ color: 'red' }}>{formik.errors.name}</div>
            ) : null}
          </Form.Field>
          <Form.Field>
            <label>Athlete Age</label>
            <Input
              name="age"
              placeholder="Enter athlete age"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.age && formik.errors.age ? (
              <div style={{ color: 'red' }}>{formik.errors.age}</div>
            ) : null}
          </Form.Field>
          <Form.Field>
            <label>Athlete Height</label>
            <Input
              name="height"
              placeholder="Enter athlete height"
              value={formik.values.height}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.height && formik.errors.height ? (
              <div style={{ color: 'red' }}>{formik.errors.height}</div>
            ) : null}
          </Form.Field>
          <Form.Field>
            <label>Athlete Weight</label>
            <Input
              name="weight"
              placeholder="Enter athlete weight"
              value={formik.values.weight}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.weight && formik.errors.weight ? (
              <div style={{ color: 'red' }}>{formik.errors.weight}</div>
            ) : null}
          </Form.Field>
          <Form.Field>
            <label>Athlete Gender</label>
            <Input
              name="gender"
              placeholder="Enter athlete gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.gender && formik.errors.gender ? (
              <div style={{ color: 'red' }}>{formik.errors.gender}</div>
            ) : null}
          </Form.Field>
          <Form.Field>
            <label>Athlete Boot size</label>
            <Input
              name="boot_size"
              placeholder="Enter athlete boot size"
              value={formik.values.boot_size}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.boot_size && formik.errors.boot_size ? (
              <div style={{ color: 'red' }}>{formik.errors.boot_size}</div>
            ) : null}
          </Form.Field>
          <Form.Field>
            <label>Athlete Stance</label>
            <Input
              name="stance"
              placeholder="Enter athlete stance"
              value={formik.values.stance}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.stance && formik.errors.stance ? (
              <div style={{ color: 'red' }}>{formik.errors.stance}</div>
            ) : null}
          </Form.Field>
          <Form.Field>
            <label>Athlete Discipline</label>
            <Input
              name="discipline"
              placeholder="Enter athlete discipline"
              value={formik.values.discipline}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.discipline && formik.errors.discipline ? (
              <div style={{ color: 'red' }}>{formik.errors.height}</div>
            ) : null}
          </Form.Field>
          <Form.Field>
            <label>Athlete Profile Photo</label>
            <Input
              name="profile_picture"
              placeholder="Enter img URL for picture"
              value={formik.values.profile_picture}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.profile_picture && formik.errors.profile_picture && (
              <div className="error">{formik.errors.profile_picture}</div>
            )}
          </Form.Field>
    <Button >Add Equipment</Button>
      <Button type='submit'>Submit</Button>
  </Form>
    </Segment>
  </Grid.Column>
  );
};

const AddAthleteForm = ({handleItemClick}) => {
  return (
    <ToastProvider>
      <AddAthleteFormContent handleItemClick={handleItemClick} />
    </ToastProvider>
  );
};


export default AddAthleteForm;