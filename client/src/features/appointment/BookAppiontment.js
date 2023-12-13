import React, {useState} from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Modal, Card, Segment } from 'semantic-ui-react';
import { addAppointmentsToCoach, deleteAppointmentsToCoach } from '../coach/coachSlice';
import AddAthleteServiceForm from './AddAthleteServiceForm';


const BookAppointment = () => {
  const dispatch = useDispatch()
  const coachId = useSelector((state) => state.coach.data.id)
  const [appointment, setAppointment] = useState({})
  const appointmentServices = appointment.athlete_services || []
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
    .then((createdApointment) => {
      // Handle the response (you might want to update the state or perform other actions)
      dispatch(addAppointmentsToCoach(createdApointment))
      console.log("Appointment created successfully:", appointment);
      setAppointment(createdApointment)
      console.log('Appointment', appointment)
      setFormSubmitted(true);
      // You can add logic here to handle the successful creation of the appointment
    })
    .catch((error) => {
      console.error("Error creating appointment:", error.message);
    });
};

const handleAddAthleteService = () => {
  console.log("test1", appointment)
  setShowModal(true); // Show the modal when "Add Athlete Service" is clicked
};

const handleModalClose = () => {
  console.log("test2", appointment)
  setShowModal(false); // Close the modal
};

const calculateTotal = () => {
  if (appointment.athlete_services && Array.isArray(appointment.athlete_services)) {
    return appointment.athlete_services.reduce((total, service) => total + (service.services.price || 0), 0);
  } else {
    return 0;
  }
};
// const extractedData = appointment.athlete_services.map((service) => ({
//   name: service.services.name,
//   discipline: service.services.price,
// }));

// console.log(extractedData);

  // const AthleteServiceCard = ({ service }) => (
  //   <Card>
  //     <Card.Content>
  //       <Card.Header>{service.name}</Card.Header>
  //       <Card.Meta>Discipline: {service.discipline}</Card.Meta>
  //       <Card.Description>{service.notes}</Card.Description>
  //     </Card.Content>
  //   </Card>
  // );
console.log("test3", appointment)
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
  <p>Total: ${calculateTotal()}</p>
  <Button type='submit'>Submit</Button>
</Form>
{formSubmitted && (
  <Button onClick={handleAddAthleteService} style={{ marginTop: '10px' }}>
    Add Athlete Service
  </Button>
)}
{appointment.athlete_services && appointment.athlete_services.length > 0 &&(
  <Button onClick={handleAddAthleteService} style={{ marginTop: '10px' }}>
    Pre-pay
  </Button>
)}
<Modal open={showModal} onClose={handleModalClose}>
        <Modal.Header>Add Athlete Service</Modal.Header>
        <Modal.Content>
         <AddAthleteServiceForm appointment={appointment} handleModalClose={handleModalClose} setAppointment={setAppointment}/>
        </Modal.Content>
        
      </Modal>
      {appointment.athlete_services && (
        <Segment>
          <h3>Athlete Services: {appointment.athlete_services.length}</h3>
          <Card.Group>
            {appointment.athlete_services.map((service) => (
              <Card key={service.id}>
                <Card.Content>
                  <Card.Header>{service.services.name}: ${service.services.price}</Card.Header>
                  <Card.Meta>Athlete: {service.athletes.name}</Card.Meta>
                  <Card.Meta>Discipline: {service.discipline}</Card.Meta>
                  <Card.Description>{service.notes}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Segment>
      )}

</>
  )
}

export default BookAppointment;