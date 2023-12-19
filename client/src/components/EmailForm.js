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
    <Form.Field>
    <label>First name</label>
    <input type="text" name="user_first_name" />
    </Form.Field>
    <Form.Field>
    <label>Last name</label>
    <input type="text" name="user_last_name" />
    </Form.Field>
    <Form.Field>
    <label>Email</label>
    <input type="email" name="user_email" />
    </Form.Field>
    <Form.Field>
    <label>Phone</label>
    <input type="tel" name="user_phone" />
    </Form.Field>
    <Form.Field>
    <label>Subject</label>
    <input type="text" name="user_subject" />
    </Form.Field>
    <Form.Field>
    <label>Message</label>
    <textarea name="message" />
    <input type="submit" value="Send" />
    </Form.Field>
  </form>
  
  );
};


export default EmailForm;


