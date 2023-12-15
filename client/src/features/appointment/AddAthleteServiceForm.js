
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Modal, Dropdown } from 'semantic-ui-react';
import { patchAppointment, patchAthlete, addError, fetchCurrentUser } from '../coach/coachSlice';
import { useToasts } from 'react-toast-notifications';
import { getToken } from '../../utils/main';
import { checkToken } from '../../utils/main';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddAthleteServiceForm = ({ appointment, handleModalClose, setAppointment }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [athlete, setAthlete] = useState({});
  const [services, setServices] = useState([]);
  const coach = useSelector((state) => state.coach.data);
  const coachAthletes = coach.athletes;
  const athleteEquipment = athlete.equipment || [];
  console.log(appointment);
  const { addToast } = useToasts();
  const handleNewError = useCallback((error) => {
    addToast(error, { appearance: 'error', autoDismiss: true });
  }, [addToast]);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);


  const validationSchema = Yup.object().shape({
    athlete_id: Yup.string().required('Athlete is required'),
    equipment_id: Yup.string().required('Equipment is required'),
    service_id: Yup.string().required('Service is required'),
    discipline: Yup.string().required('Discipline is required'),
    notes: Yup.string().required('Notes is required'),
  });

  const sendRequest = (values) => {
    if (!getToken() || !checkToken()) {
      handleNewError('User not logged in');
      navigate('/')
      return;
    }

    const formData = { ...values, appointment_id: appointment.id };
    fetch('http://127.0.0.1:5555/athlete-services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (res.ok) {
            res.json().then(newService => {
              const updateAppointment = {
                ...appointment,
                athlete_services: [...appointment.athlete_services, newService],
              };
              const updatedAthlete = {
                ...athlete,
                athlete_services: [...athlete.athlete_services, newService],
                       };
              dispatch(patchAthlete(updatedAthlete));
              dispatch(patchAppointment(updateAppointment));
              setAppointment(updateAppointment);
              console.log('TEST6', updateAppointment);
              handleModalClose();
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
    initialValues: {
      athlete_id: '',
      equipment_id: '',
      service_id: '',
      discipline: '',
      notes: '',
    },
    validationSchema,
    onSubmit: (values) => {
      sendRequest(values);
    },
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5555/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error.message);
      }
    };
    fetchServices();
  }, []);

  const handleAthleteDropdownChange = (e, { value }) => {
    const selectedAthlete = coachAthletes.find((athlete) => athlete.id === value);
    setAthlete(selectedAthlete);
    console.log(athlete);
    formik.setFieldValue('athlete_id', value);
  };

  const handleEquipmentDropdownChange = (e, { value }) => {
    formik.setFieldValue('equipment_id', value);
  };

  const handleServiceDropdownChange = (e, { value }) => {
    formik.setFieldValue('service_id', value);
  };


  return (
    <Form onSubmit={formik.handleSubmit}>
      <label>Athlete</label>
      <Form.Field>
        <Dropdown
          placeholder="Select Athlete"
          fluid
          search
          selection
          options={coachAthletes.map((athlete) => ({
            key: athlete.id,
            value: athlete.id,
            text: athlete.name,
          }))}
          value={formik.values.athlete_id}
          onChange={handleAthleteDropdownChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.athlete_id && formik.errors.athlete_id ? (
          <div style={{ color: 'red' }}>{formik.errors.athlete_id}</div>
        ) : null}
      </Form.Field>
      <Form.Field>
        <label>Equipment</label>
        <Dropdown
          placeholder="Select Equipment"
          fluid
          search
          selection
          options={athleteEquipment.map((item) => ({
            key: item.id,
            value: item.id,
            text: item.model,
          }))}
          value={formik.values.equipment_id}
          onChange={handleEquipmentDropdownChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.equipment_id && formik.errors.equipment_id ? (
          <div style={{ color: 'red' }}>{formik.errors.equipment_id}</div>
        ) : null}
      </Form.Field>
      <Form.Field>
        <label>Service</label>
        <Dropdown
          placeholder="Select Service"
          fluid
          search
          selection
          options={services.map((service) => ({
            key: service.id,
            value: service.id,
            text: service.name,
          }))}
          value={formik.values.service_id}
          onChange={handleServiceDropdownChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.service_id && formik.errors.service_id ? (
          <div style={{ color: 'red' }}>{formik.errors.service_id}</div>
        ) : null}
      </Form.Field>
      <Form.Field>
        <label>Discipline</label>
        <Input
          name="discipline"
          placeholder="Enter equipment width"
          value={formik.values.discipline}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.discipline && formik.errors.discipline ? (
          <div style={{ color: 'red' }}>{formik.errors.discipline}</div>
        ) : null}
      </Form.Field>
      <Form.Field>
        <label>Notes</label>
        <Input
          name="notes"
          placeholder="Enter equipment notes"
          value={formik.values.notes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.notes && formik.errors.notes ? (
          <div style={{ color: 'red' }}>{formik.errors.notes}</div>
        ) : null}
      </Form.Field>
      <Button type="submit">Submit Athlete Service</Button>
    </Form>
  );
};

export default AddAthleteServiceForm;
