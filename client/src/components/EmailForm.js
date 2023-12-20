import React, { useRef, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { Form, Input, TextArea, Button, Segment, Grid } from 'semantic-ui-react';
import { useToasts } from 'react-toast-notifications';

const EmailForm = () => {
  const form = useRef();
  const { addToast } = useToasts();

  const handleNewError = useCallback((error) => {
    addToast(error, { appearance: 'error', autoDismiss: true });
  }, [addToast]);

  const handleNewMessage = useCallback((message) => {
    addToast(message, { appearance: 'success', autoDismiss: true });
  }, [addToast]);

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      if (form.current) {
        const result = await emailjs.sendForm('service_khiquxt', 'template_9hxoh8h', form.current, 'owUT0MX0X6FuHj8lg');
        handleNewMessage('Your Email has been sent.');
        console.log(result.text);
      } else {
        console.error("Form reference not found or invalid.");
      }
    } catch (error) {
      handleNewError('Email failed to send');
      console.error(error.text);
    }

    e.target.reset();
  };

  return (
    <form ref={form} onSubmit={sendEmail} id="emailForm">
      <Grid columns={1} stackable>
        <Grid.Column>
          <Form.Field>
            <label>First name</label>
            <Input type="text" name="user_first_name" width={20} /> {/* Set width to 8 columns out of 16 */}
          </Form.Field>
          <Form.Field>
            <label>Last name</label>
            <Input type="text" name="user_last_name" width={8} /> {/* Set width to 8 columns out of 16 */}
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <Input type="email" name="user_email" width={16} /> {/* Set width to 16 columns out of 16 for full width */}
          </Form.Field>
        </Grid.Column>
        <Grid.Column>
          <Form.Field>
            <label>Phone</label>
            <Input type="tel" name="user_phone" width={8} /> {/* Set width to 8 columns out of 16 */}
          </Form.Field>
          <Form.Field>
            <label>Subject</label>
            <Input type="text" name="user_subject" width={8} /> {/* Set width to 8 columns out of 16 */}
          </Form.Field>
          <Form.Field>
            <label>Message</label>
            <TextArea name="message" width={16} /> {/* Set width to 16 columns out of 16 for full width */}
          </Form.Field>
        </Grid.Column>
      </Grid>
      <Button type="submit">Send</Button>
    </form>
  );
};


export default EmailForm;


