import {useEffect, useState, useCallback} from "react"
import {useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { Card, Button, Modal, Form, TextArea, Header, Input } from 'semantic-ui-react'
import { deleteAppointmentsToCoach, patchAppointment, patchAthlete, fetchCurrentUser, addError } from '../coach/coachSlice';
import AddAthleteServiceForm from './AddAthleteServiceForm';
import { getToken } from '../../utils/main';
import { checkToken } from '../../utils/main';
import { useToasts } from 'react-toast-notifications';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ConfirmEditEmail from "./ConfirmEditAppt";

const EditAppointment = ( { setIsEditModalOpen,  setSelectedAppointment, selectedAppointment, isEditModalOpen, handleItemClick }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const coach = useSelector((state) => state.coach.data)
  const coachId = useSelector((state) => state.coach.data.id)
  const coachAthletes = coach.athletes;
  const [athlete, setAthlete] = useState({});
  const [editedAppointment, setEditedAppointment] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { addToast } = useToasts();
  const handleNewError = useCallback((error) => {
    addToast(error, { appearance: 'error', autoDismiss: true });
  }, [addToast]);
  const handleNewMessage = useCallback((message) => {
    addToast(message, { appearance: 'success', autoDismiss: true });
  }, [addToast]);


  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);


  const handleAddAthleteService = () => {
    setShowModal(true); 
  };

  const handleModalClose = () => {
    setShowModal(false); 
  };

  const sendRequest = (values) => {
    if (!getToken() || !checkToken()) {
      handleNewError('User not logged in');
      navigate('/')
      return;
    }
    fetch(`http://127.0.0.1:5555/appointment/${selectedAppointment.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    .then(res => {
      if (res.ok) {
          res.json().then(createdAppointment => {
            dispatch(patchAppointment(createdAppointment));
            setSelectedAppointment(createdAppointment);
            handleNewMessage('App edit test pass')
            // setFormSubmitted(true);
            setShowPaymentModal(true);
          })
      } else {
          res.json().then(errorObj => {
          dispatch(addError(errorObj.message));
          handleNewError(errorObj.message);
        });
      }
      })
    }

    const formik = useFormik({
      initialValues: {
        coaches_id: coachId,
        pickup_location: '',
        dropoff_location: '',
        booking_time: '',
      },
      validationSchema: Yup.object().shape({
        pickup_location: Yup.string().required('Pick-up location is required'),
        dropoff_location: Yup.string().required('Drop-off location is required'),
        booking_time: Yup.string().required('Booking time is required'),
      }),
      onSubmit: (values) => {
        sendRequest(values);
      },
    });
  
    useEffect(() => {
      if (selectedAppointment && Object.keys(selectedAppointment).length > 0) {
        formik.setValues({
          coaches_id: coachId,
          pickup_location: selectedAppointment.pickup_location,
          dropoff_location: selectedAppointment.dropoff_location,
          booking_time: selectedAppointment.booking_time,
        });
      }
    }, [selectedAppointment, coachId, formik.setValues]);

  const handleDeleteService = (services) => {
    if (!getToken() || !checkToken()) {
      handleNewError('User not logged in');
      navigate('/')
      return;
    }

    const selectedAthlete = coachAthletes.find((athlete) => athlete.id === services.athletes.id)
    console.log("selectedAthlete",selectedAthlete)
    setAthlete(selectedAthlete)
    fetch(`http://127.0.0.1:5555/athlete-service/${services.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          const updatedService = selectedAppointment.athlete_services.filter((service) => service.id !== services.id);
          const updatedAthleteService = selectedAthlete.athlete_services.filter((service) => service.id !== services.id);
          setSelectedAppointment({
            ...selectedAppointment,
            athlete_services: updatedService,
          });
          dispatch(patchAppointment({
            ...selectedAppointment,
            athlete_services: updatedService,
          }));
          dispatch(patchAthlete({
            ...selectedAthlete,
            athlete_services: updatedAthleteService,
          }));
          console.log( "athlete", athlete)
        } else {
          res.json().then(errorObj => {
            dispatch(addError(errorObj.message));
            handleNewError(errorObj.message);
          });
        }
      })
      .catch((error) => {
        console.error('Error deleting service:', error.message);
      });
  };

  const handlePrePayClick = () => {
    setShowPaymentModal(true);
  };
  
  const handlePaymentModalClose = () => {
    setShowPaymentModal(false);
  };

  return (
    <>
     <Modal open onClose={() => setIsEditModalOpen(false)}>
    <Modal.Header>Edit Appointment</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Field>
            <label>Pick-up Location</label>
            <Input
              name="pickup_location"
              value={formik.values.pickup_location}
              placeholder="Enter your pick-up location"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.pickup_location && formik.errors.pickup_location ? (
              <div style={{ color: 'red' }}>{formik.errors.pickup_location}</div>
            ) : null}
          </Form.Field>
          <Form.Field>
            <label>Drop-off Location</label>
            <Input
              name="dropoff_location"
              value={formik.values.dropoff_location}
              placeholder="Enter your drop-off location"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.dropoff_location && formik.errors.dropoff_location ? (
              <div style={{ color: 'red' }}>{formik.errors.dropoff_location}</div>
            ) : null}
          </Form.Field>
          <Form.Field>
            <label>Schedule Pick-up Time</label>
            <Input
              name="booking_time"
              value={formik.values.booking_time}
              placeholder="Enter your pickup time"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.booking_time && formik.errors.booking_time ? (
              <div style={{ color: 'red' }}>{formik.errors.booking_time}</div>
            ) : null}
          </Form.Field>
        </Form>

        {selectedAppointment.athlete_services.map((service) => (
          <Card key={service.id}>
            <Card.Content>
              <Button color="red" style={{ position: 'absolute', top: '5px', right: '5px' }} onClick={() => handleDeleteService(service)}>
                X
              </Button>
              <Card.Header>{service.services.name}: ${service.services.price}</Card.Header>
              <Card.Meta>Athlete: {service.athletes.name}</Card.Meta>
              <Card.Meta>Discipline: {service.discipline}</Card.Meta>
              <Card.Description>{service.notes}</Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
    <Button onClick={handleAddAthleteService} style={{ marginTop: '10px' }}>
          Add Athlete Service
        </Button>
      <Button primary type="submit" onClick={formik.handleSubmit}>
        Save Changes
      </Button>
      <Button secondary onClick={() => { 
        setIsEditModalOpen(false);
        setEditedAppointment({});
      }}>
        Cancel
      </Button>
    </Modal.Actions>
  </Modal>
<Modal open={showModal} onClose={handleModalClose}>
        <Modal.Header>Add Athlete Service</Modal.Header>
        <Modal.Content>
          <AddAthleteServiceForm  handleModalClose={handleModalClose}  appointment={selectedAppointment} setAppointment={setSelectedAppointment}/>
        </Modal.Content>
      </Modal>
      <Modal open={showPaymentModal} onClose={handlePaymentModalClose}>
        <Modal.Header>Add Athlete Service</Modal.Header>
        <Modal.Content>
          <ConfirmEditEmail  showPaymentModal={showPaymentModal} handlePaymentModalClose={handlePaymentModalClose} appointment={selectedAppointment} handleItemClick={handleItemClick}/>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default EditAppointment;