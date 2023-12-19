import {useEffect, useState, useCallback} from "react"
import {useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { Card, Button, Modal, Form, TextArea, Header, Input } from 'semantic-ui-react'
import { deleteAppointmentsToCoach, patchAppointment, patchAthlete, fetchCurrentUser, addError } from '../coach/coachSlice';
import { getToken } from '../../utils/main';
import { checkToken } from '../../utils/main';
import { useToasts } from 'react-toast-notifications';
import EditAppointment from "./EditAppointment";

const CoachAppointments = ({handleItemClick}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const coach = useSelector((state) => state.coach.data)
  const coachAppointments = coach.appointment;
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [showReviewField, setShowReviewField] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedAppointment, setEditedAppointment] = useState({});
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

  const handleRemoveAppointment = (event,appointment) => {
    event.stopPropagation();
    if (!getToken() || !checkToken()) {
      handleNewError('User not logged in');
      navigate('/')
      return;
    }
    const choice = prompt('Are you sure want to delete this appointment? This will delete all this appopintment data. There is no coming back from this!\nType YES to continue.');
    if (!choice) {
      return;
    } else if (choice.toLowerCase() === 'yes') {
    fetch(`http://127.0.0.1:5555/appointment/${appointment.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete athlete');
        }
        return response.json();
      })
      .then(() => {
        dispatch(deleteAppointmentsToCoach(appointment.id));
        const athleteIds = appointment.athlete_services.map((service) => service.athletes.id);
        athleteIds.forEach((athleteId) => {
          fetch(`http://127.0.0.1:5555/athlete/${athleteId}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Failed to fetch athlete data');
              }
              return response.json();
            })
            .then((athleteData) => {
              const updatedAthleteServices = athleteData.athlete_services.filter(
                (service) => !appointment.athlete_services.find((appService) => appService.id === service.id)
              );
              dispatch(patchAthlete({
                ...athleteData,
                athlete_services: updatedAthleteServices,
              }));
            })
            .catch((error) => {
              console.error('Error updating athlete services:', error.message);
            });
        });
      })
      .catch((error) => {
        console.error('Error deleting appointment:', error.message);
      });
  }
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
    if (selectedService) {
      fetch(`http://127.0.0.1:5555/athlete-service/${selectedService.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reviews: reviewText }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to update athlete service with review');
          }
          return response.json();
        })
        .then((updatedService) => {
          const updatedAppointment = {
            ...selectedAppointment,
            athlete_services: selectedAppointment.athlete_services.map((service) =>
              service.id === updatedService.id ? updatedService : service
            ),
          };
          dispatch(patchAppointment(updatedAppointment))
          console.log("Updated Appointment with new review:", updatedService);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    setSelectedService(null);
    setReviewText('');
  };

  const handleBookAppointment = () => {
    handleItemClick(null, { name: 'book-appointment' })
  }

  return (
    <>
    <Header><h1>Appointments</h1>
    <Button secondary style={{ position: 'absolute', top: '5px', right: '5px' }}
          onClick={handleBookAppointment}
          >
          Book Appointment
        </Button>
    </Header>
    <Card.Group>
        {coachAppointments.map((appointment) => (
          <Card key={appointment.id} onClick={() => handleCardClick(appointment)}>
          <Card.Content>
          <Button secondary style={{ position: 'absolute', top: '5px', right: '5px' }}
          onClick={(event) => handleRemoveAppointment(event, appointment)}
          >
          X
        </Button>
            <Card.Header>{appointment.booking_time} ID#: {appointment.id}</Card.Header>
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
        <Modal.Header>{selectedAppointment.booking_time}
        <Button
          secondary
          onClick={() => {
            setIsEditModalOpen(true);
            setEditedAppointment(selectedAppointment); 
          }}
        >
          Edit Appointment
        </Button>
        </Modal.Header>
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
      {isEditModalOpen && (
      <EditAppointment setIsEditModalOpen={setIsEditModalOpen} setSelectedAppointment={setSelectedAppointment} isEditModalOpen={isEditModalOpen} selectedAppointment={selectedAppointment} handleItemClick={handleItemClick}/>
      )} 
     
    </>
    
  )
}

export default CoachAppointments;