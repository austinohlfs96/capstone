import React, { useRef, useState, useCallback } from 'react';
import { useSelector} from "react-redux"
import emailjs from '@emailjs/browser';
import { Form, Input, TextArea, Button } from 'semantic-ui-react';
import { useToasts } from 'react-toast-notifications';

const ConfirmEmail = ({ appointment, handlePaymentModalClose, handleItemClick }) => {
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
    handleItemClick(null, {name: "view-appointments"})
  }

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
        handlePaymentModalClose()
        handleNewMessage('Appointment scheduled. A confirmation email has been sent to your email.')
        handleConfirm()
      })
      .catch((error) => {
        console.log(error.text);
      });

    e.target.reset();
  };
  // const sendAutoReply = () => {
  //   // Send auto-reply email
  //   emailjs
  //     .sendForm('YOUR_USER_SERVICE_ID', 'AUTO_REPLY_TEMPLATE_ID', autoReplyForm.current, 'YOUR_USER_ID')
  //     .then((result) => {
  //       console.log(result.text);
  //       setAutoReplySent(true);
  //     })
  //     .catch((error) => {
  //       console.log(error.text);
  //     });
  // };

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
          // value={``}
          // onChange={(e) => setAdditionalData(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Appointment Notes</label>
        <Input
          type="text"
          name="notes"
          // value={``}
          // onChange={(e) => setAdditionalData(e.target.value)}
        />
      </Form.Field>

      <input type="submit" value="Send" />
    </form>
     {/* <h2>Admin Email Form</h2>
     <form ref={adminForm} onSubmit={sendAdminEmail}>
       <Form.Field>
         <label>Additional Admin Data</label>
         <Input
           type="text"
           name="appiontment"
           value={`Admin: ${appointment.coaches.name} Number of Services${appointment.athlete_services.length} ${appointment.pickup_location} ${appointment.dropoff_location} ${appointment.booking_time}`}
           onChange={(e) => setAdditionalData(e.target.value)}
         />
       </Form.Field>

       <Button primary type="submit">
         Send Admin Email
       </Button>
     </form> */}
     
     </>
  );
};

export default ConfirmEmail;
