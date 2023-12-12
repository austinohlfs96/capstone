import {useSelector, useDispatch } from "react-redux"
import { Card, Button } from 'semantic-ui-react'
import { addAppointmentsToCoach, deleteAppointmentsToCoach } from '../coach/coachSlice';



const CoachAppointments = () => {
  const dispatch = useDispatch();
  const coach = useSelector((state) => state.coach.data)
  const coachAppointments = coach.appointment;


  const handleRemoveAppointment = (appointmentId) => {
    // Make a delete request to your server
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


  return (
    <Card.Group>
        {coachAppointments.map((appointment) => (
          <Card key={appointment.id}>
          
          
          <Card.Content>
          <Button secondary style={{ position: 'absolute', top: '5px', right: '5px' }}
          onClick={() => handleRemoveAppointment(appointment.id)}
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
  )
}

export default CoachAppointments;