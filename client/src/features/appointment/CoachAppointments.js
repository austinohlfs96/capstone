import {useEffect, useState} from "react"
import {useSelector, useDispatch } from "react-redux"
import { Card, Button, Modal, Form, TextArea } from 'semantic-ui-react'
import { deleteAppointmentsToCoach, patchAppointmentsAthleteServices, patchAppointment } from '../coach/coachSlice';
import { setCurrentAppointment, patchAthleteService} from "./appointmentSlice";
import {  } from "./athleteServiceSlice";


const CoachAppointments = () => {
  const dispatch = useDispatch();
  const coach = useSelector((state) => state.coach.data)
  // const athleteService = useSelector((state) => state.athleteService.data)
  const coachAppointments = coach.appointment;
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [showReviewField, setShowReviewField] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const selectedAppointmentId = selectedAppointment.id



  const handleRemoveAppointment = (event,appointmentId) => {
    event.stopPropagation();
    fetch(`http://127.0.0.1:5555/appointment/${appointmentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers needed (e.g., authentication token)
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete athlete');
        }
        return response.json();
      })
      .then(() => {
        // Dispatch a Redux action to update the state
        dispatch(deleteAppointmentsToCoach(appointmentId));
      })
      .catch((error) => {
        console.error(error);
        // Handle error as needed
      });
  };

  const handleCardClick = (appointment) => {
    setSelectedAppointment(appointment);
    setSelectedService(null);
    setReviewText('');
    setShowReviewField(false);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
  };

  const handleWriteReviewClick = (service) => {
    setSelectedService(service);
    setShowReviewField(true);
  };

  const handleReviewSubmit = () => {
    // Send a PATCH request to update the athlete service with the review
    if (selectedService) {
      fetch(`http://127.0.0.1:5555/athlete-service/${selectedService.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers needed (e.g., authentication token)
        },
        body: JSON.stringify({ reviews: reviewText }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to update athlete service with review');
          }
          return response.json();
        })
        .then((updateService) => {
         
          dispatch(patchAppointmentsAthleteServices(selectedAppointmentId, updateService))
          console.log("Updated Appointment with new review:", selectedAppointmentId, updateService);
        })
        .catch((error) => {
          console.error(error);
          // Handle error as needed
        });
    }
  
    // Reset the review field and hide it
    setSelectedService(null);
    setReviewText('');
  };
  
  


  return (
    <>
    <Card.Group>
        {coachAppointments.map((appointment) => (
          <Card key={appointment.id} onClick={() => handleCardClick(appointment)}>
          
          
          <Card.Content>
          <Button secondary style={{ position: 'absolute', top: '5px', right: '5px' }}
          onClick={(event) => handleRemoveAppointment(event, appointment.id)}
          >
          X
        </Button>
            <Card.Header>{appointment.booking_time}</Card.Header>
            <Card.Meta>
              <span className='date'>{`Pick-up: ${appointment.pickup_location}`}</span>
            </Card.Meta>
            
            <Card.Description>{`Drop-off: ${appointment.dropoff_location}`}</Card.Description>
            <Card.Description>{`Number of services: ${appointment.athlete_services ? appointment.athlete_services.length : 0}`}
            </Card.Description>
           
          </Card.Content>
        </Card>
      ))}
    </Card.Group>

    {selectedAppointment && (
      <Modal open onClose={handleCloseModal}>
        <Modal.Header>{selectedAppointment.booking_time}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>{`Pick-up: ${selectedAppointment.pickup_location}`}</p>
            <p>{`Drop-off: ${selectedAppointment.dropoff_location}`}</p>
            <p>{`Number of services: ${
              selectedAppointment.athlete_services ? selectedAppointment.athlete_services.length : 0
            }`}</p>
          {selectedAppointment.athlete_services && (
                <Card.Group>
                  {selectedAppointment.athlete_services.map((service) => (
                    <Card key={service.id}>
                    <Card.Content>
                      <Card.Header>{service.services.name}</Card.Header>
                      <Card.Meta>Athlete: {service.athletes.name}</Card.Meta>
                      <Card.Meta>Equipment:{service.equipment.manifacture} {service.equipment.model}</Card.Meta>
                      <Card.Meta>Discipline: {service.discipline}</Card.Meta>
                      <Card.Description>Coach notes: {service.notes}</Card.Description>
                      <Card.Description>Technician notes: {service.technician_notes}</Card.Description>
                      <Card.Description>Review: {service.reviews}</Card.Description>
                    </Card.Content>
                    {showReviewField && selectedService?.id === service.id ? (
                          <Form onSubmit={() => handleReviewSubmit(service)}>
                            <Form.Field
                              control={TextArea}
                              placeholder='Write your review...'
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                            />
                            <Button primary type="submit">
                              Submit Review
                            </Button>
                          </Form>
                        ) : (
                          <Button
                            secondary
                            onClick={() => handleWriteReviewClick(service)}
                          >
                            Write Review
                          </Button>
                        )}
                  </Card>
               
                  ))}
                </Card.Group>
              )}
          </Modal.Description>
        </Modal.Content>
      </Modal>
      )}

    </>
    
  )
}

export default CoachAppointments;