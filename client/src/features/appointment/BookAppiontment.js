import React, {useState} from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Modal } from 'semantic-ui-react';
import { addAppointmentsToCoach, deleteAppointmentsToCoach } from '../coach/coachSlice';
import AddAthleteServiceForm from './AddAthleteServiceForm';


const BookAppointment = () => {
  const dispatch = useDispatch()
  const coachId = useSelector((state) => state.coach.data.id)
  const [appointment, setAppointment] = useState(null)
  const [formData, setFormData] = useState({
    coaches_id: coachId,
    pickup_location: '',
    dropoff_location: '',
    booking_time: '',
});

const [formSubmitted, setFormSubmitted] = useState(false);
const [showModal, setShowModal] = useState(false);


const handleAppointmentFormSubmit = (formData) => {
  // Make a POST request to the server
  fetch("http://127.0.0.1:5555/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to create appointment");
      }
      return res.json();
    })
    .then((appointment) => {
      // Handle the response (you might want to update the state or perform other actions)
      dispatch(addAppointmentsToCoach(appointment))
      console.log("Appointment created successfully:", appointment);
      setAppointment(appointment)
      console.log('Appointment', appointment)
      setFormSubmitted(true);
      // You can add logic here to handle the successful creation of the appointment
    })
    .catch((error) => {
      console.error("Error creating appointment:", error.message);
    });
};

const handleAddAthleteService = () => {
  setShowModal(true); // Show the modal when "Add Athlete Service" is clicked
};

const handleModalClose = () => {
  setShowModal(false); // Close the modal
};


  return (
    <>
    <Form
    onSubmit={() => handleAppointmentFormSubmit(formData)}
    >
  
  <Form.Field>
    <label>Pick-up Location</label>
    <Input
    name="pickup_location" 
    value={formData.pickup_location}
    placeholder='Enter your pick-up location'
    onChange={(e, { value }) =>
    setFormData({ ...formData, pickup_location: value })
  } />
  </Form.Field>
  <Form.Field>
    <label>Drop-off Location</label>
    <Input
    name="dropoff_location" 
    value={formData.dropoff_location}
    placeholder='Enter your drop-off location'
    onChange={(e, { value }) =>
    setFormData({ ...formData, dropoff_location: value })
  } />
  </Form.Field>
  <Form.Field>
    <label>Schedule Pick-up Time</label>
    <Input
    name="booking_time" 
    value={formData.booking_time}
    placeholder='Enter your pickup time'
    onChange={(e, { value }) =>
    setFormData({ ...formData, booking_time: value })
  } />
  </Form.Field>
  <Button type='submit'>Submit</Button>
</Form>
{formSubmitted && (
  <Button onClick={handleAddAthleteService} style={{ marginTop: '10px' }}>
    Add Athlete Service
  </Button>
)}
<Modal open={showModal} onClose={handleModalClose}>
        <Modal.Header>Add Athlete Service</Modal.Header>
        <Modal.Content>
         <AddAthleteServiceForm appointment={appointment} handleModalClose={handleModalClose}/>
        </Modal.Content>
      </Modal>

</>
  )
}

export default BookAppointment;