
import React, {useCallback, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input } from 'semantic-ui-react';
import { patchAthlete, addError, fetchCurrentUser } from '../coach/coachSlice';
import { addEquipmentToAthlete } from './AthleteSlice';
import { useFormik } from 'formik';
import { getToken, checkToken } from '../../utils/main';
import * as Yup from 'yup';
import { ToastProvider, useToasts } from 'react-toast-notifications';

const AddEquipment = ({ athlete, onCloseAddEquipmentModal }) => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const handleNewError = useCallback((error) => {
    addToast(error, { appearance: 'error', autoDismiss: true });
  }, [addToast]);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const validationSchema = Yup.object().shape({
    type: Yup.string().required('Type is required'),
    manifacture: Yup.string().required('Manufacturer is required'),
    model: Yup.string().required('Model is required'),
    year: Yup.string().required('Year is required'),
    length: Yup.string().required('Length is required'),
    width: Yup.string().required('Width is required'),
  });

  const sendRequest = (values) => {
    // Check if the user is logged in before making the PATCH request
    if (!getToken() || !checkToken()) {
      handleNewError('User not logged in');
      // Handle the case where the user is not logged in (redirect, show a message, etc.)
      return;
    }
    const formDataWithoutExcludedField = { ...values };
      delete formDataWithoutExcludedField.athlete_name;
      fetch('http://127.0.0.1:5555/equipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithoutExcludedField),
      })
      .then(res => {
        if (res.ok) {
            res.json().then(equipment => {
              const updatedAthlete = {
                  ...athlete,
                  equipment: [...athlete.equipment, equipment],
                         };
              dispatch(patchAthlete(updatedAthlete));
              onCloseAddEquipmentModal();
              // handleItemClick(null, { name: 'athletes' });
            })
        } else {
            res.json().then(errorObj => {
              console.log("error", errorObj)
            dispatch(addError(errorObj.message));
            handleNewError(errorObj.message);
          });
        }
        })}

  const formik = useFormik({
    initialValues: {
      athlete_id: athlete.id,
      athlete_name: athlete.name,
      type: '',
      manifacture: '',
      model: '',
      year: '',
      length: '',
      width: '',
    },
    validationSchema,
    onSubmit: (values) => {
      sendRequest(values)
     
    }})
        

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Field>
        <label>Athlete Name</label>
        <Input
          name="athlete_name"
          placeholder="Enter equipment name"
          value={formik.values.athlete_name}
          readOnly
        />
      </Form.Field>
      <Form.Field>
        <label>Type</label>
        <Input
          name="type"
          placeholder="Enter equipment type"
          value={formik.values.type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.type && formik.errors.type ? (
          <div style={{ color: 'red' }}>{formik.errors.type}</div>
        ) : null}
      </Form.Field>
      <Form.Field>
        <label>Manufacturer</label>
        <Input
          name="manifacture"
          placeholder="Enter equipment manufacturer"
          value={formik.values.manifacture}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.manifacture && formik.errors.manifacture ? (
          <div style={{ color: 'red' }}>{formik.errors.manifacture}</div>
        ) : null}
      </Form.Field>
      <Form.Field>
        <label>Model</label>
        <Input
          name="model"
          placeholder="Enter equipment model"
          value={formik.values.model}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.model && formik.errors.model ? (
          <div style={{ color: 'red' }}>{formik.errors.model}</div>
        ) : null}
      </Form.Field>
      <Form.Field>
        <label>Year</label>
        <Input
          name="year"
          placeholder="Enter equipment year"
          value={formik.values.year}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.year && formik.errors.year ? (
          <div style={{ color: 'red' }}>{formik.errors.year}</div>
        ) : null}
      </Form.Field>
      <Form.Field>
        <label>Length</label>
        <Input
          name="length"
          placeholder="Enter equipment length"
          value={formik.values.length}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.length && formik.errors.length ? (
          <div style={{ color: 'red' }}>{formik.errors.length}</div>
        ) : null}
      </Form.Field>
      <Form.Field>
        <label>Width</label>
        <Input
          name="width"
          placeholder="Enter equipment width"
          value={formik.values.width}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.width && formik.errors.width ? (
          <div style={{ color: 'red' }}>{formik.errors.width}</div>
        ) : null}
      </Form.Field>
      <Button type="submit">Add Equipment</Button>
      <Button onClick={onCloseAddEquipmentModal}>Close</Button>
    </Form>
  );
};

export default AddEquipment;
