import { Modal, Card } from 'semantic-ui-react';
import ConfirmEmail from './ConfirmEmail';
const ConfirmAppt = ({showPaymentModal, handlePaymentModalClose, calculateTotal, appointment, handleItemClick}) => {
  return (
    <Modal open={showPaymentModal} onClose={handlePaymentModalClose}>
        <Modal.Header>Confirm Appointment</Modal.Header>
          <Modal.Content>
          <p>Pick-up: {appointment.pickup_location}</p>
          <p>Drop-off: {appointment.dropoff_location}</p>
          <p>Pickup date: {appointment.booking_time}</p>
          <h3>Athlete Services: {appointment.athlete_services.length}</h3>
          <Card.Group>
            {appointment.athlete_services.map((service) => (
              <Card key={service.id}>
                <Card.Content>
                {/* <Button color="red" style={{ position: 'absolute', top: '5px', right: '5px' }} onClick={() => handleDeleteService(service)}>
                    X
                  </Button> */}
                  <Card.Header>{service.services.name}: ${service.services.price}</Card.Header>
                  <Card.Meta>Athlete: {service.athletes.name}</Card.Meta>
                  <Card.Meta>Discipline: {service.discipline}</Card.Meta>
                  <Card.Description>{service.notes}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
          <p>Estimated Total: ${calculateTotal()}</p>
          <ConfirmEmail appointment={appointment} handlePaymentModalClose={handlePaymentModalClose} handleItemClick={handleItemClick}/>
          </Modal.Content>
        </Modal>
  )
}

export default ConfirmAppt;