import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Form, Input, TextArea, Button } from 'semantic-ui-react';

const ConfirmEmail = ({ appointment }) => {
  const [additionalData, setAdditionalData] = useState('');
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // Send confirmation email to the user
    // emailjs.sendForm('YOUR_SERVICE_ID', 'CONFIRMATION_TEMPLATE_ID', form.current, 'YOUR_USER_ID', {
    //   appointment: JSON.stringify(appointment), // Convert the appointment object to a JSON string
    //   additionalData: additionalData,
    // })
    //   .then((result) => {
    //     console.log(result.text);
    //   })
    //   .catch((error) => {
    //     console.log(error.text);
    //   });

    // Send notification email to yourself
    emailjs.sendForm('service_khiquxt', 'template_7lnkxmp', form.current, 'owUT0MX0X6FuHj8lg')
      .then((result) => {
        console.log(result.text);
      })
      .catch((error) => {
        console.log(error.text);
      });

    e.target.reset();
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <Form.Field>
        <label>Additional Data</label>
        <Input
          type="text"
          name="appointment"
          value={`Client: ${appointment.coaches.name} Number of Services${appointment.athlete_services.length} ${appointment.pickup_location} ${appointment.dropoff_location} ${appointment.booking_time}`}
          onChange={(e) => setAdditionalData(e.target.value)}
        />
      </Form.Field>

      <input type="submit" value="Send" />
    </form>
  );
};

export default ConfirmEmail;
