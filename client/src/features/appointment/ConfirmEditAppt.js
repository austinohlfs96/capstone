import React, { useRef, useState, useCallback } from 'react';
import { useSelector} from "react-redux"
import emailjs from '@emailjs/browser';
import { Form, Input, TextArea, Button } from 'semantic-ui-react';
import { useToasts } from 'react-toast-notifications';

const ConfirmEditEmail = ({ appointment, handlePaymentModalClose, handleItemClick }) => {
  const [additionalData, setAdditionalData] = useState('');
  const coach = useSelector((state) => state.coach.data)
  const { addToast } = useToasts();
  const form = useRef();

  const handleNewMessage = useCallback((message) => {
    addToast(message, { appearance: 'success', autoDismiss: true });
  }, [addToast]);

  const sendEmail = (e) => {
    e.preventDefault();

  const handleConfirm = () => {
    handleItemClick(null, {name: "athletes"})
    console.log("test")
  }

    emailjs.sendForm('service_khiquxt', 'template_7lnkxmp', form.current, 'owUT0MX0X6FuHj8lg')
      .then((result) => {
        console.log(result.text);
        handlePaymentModalClose()
        handleNewMessage('Confirmation sent. Appointment scheduled.')
        handleConfirm()
      })
      .catch((error) => {
        console.log(error.text);
      });

    e.target.reset();
  };
  
  return (
    <>
    <form ref={form} onSubmit={sendEmail}>
      <Form.Field>
        <label>Additional Data</label>
        <Input
          type="text"
          name="appointment"
          value={`[Appointment ID: (${appointment.id})] - [Pick-up location: (${appointment.pickup_location})] - [Drop-off Location: (${appointment.dropoff_location})] - [Pick-up time: (${appointment.booking_time})]  - [Number of Services: (${appointment.athlete_services.length})]`}
          onChange={(e) => setAdditionalData(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Coaches Name</label>
        <Input
          type="text"
          name="coach_name"
          value={`${coach.name}`}
          onChange={(e) => setAdditionalData(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <Input
          type="text"
          name="email"
          value={`${coach.email}`}
          onChange={(e) => setAdditionalData(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Phone</label>
        <Input
          type="text"
          name="phone"
        />
      </Form.Field>
      <Form.Field>
        <label>Appointment Notes</label>
        <Input
          type="text"
          name="note"
        />
      </Form.Field>
      <Form.Field>
        <label>Appointment Edited</label>
        <Input
          type="text"
          name="edit"
          value={`Edited Appointment: ID#${appointment.id}`}
          onChange={(e) => setAdditionalData(e.target.value)}
        />
      </Form.Field>

      <input type="submit" value="Send" />
    </form>
    
     </>
  );
};

export default ConfirmEditEmail;
