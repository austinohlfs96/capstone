import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'

// const genderOptions = [
//   { key: 'm', text: 'Male', value: 'male' },
//   { key: 'f', text: 'Female', value: 'female' },
//   { key: 'o', text: 'Other', value: 'other' },
// ]

const EmailForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_khiquxt', 'template_9hxoh8h', form.current, 'owUT0MX0X6FuHj8lg')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
  };
  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>First name</label>
      <input type="text" name="user_first_name" />
      <label>Last name</label>
      <input type="text" name="user_last_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Phone</label>
      <input type="phone" name="user_phone" />
      <label>Subject</label>
      <input type="text" name="user_subject" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  //   <Form>
  //   <Form.Group widths='equal'>
  //     <Form.Field
  //       id='form-input-control-first-name'
  //       control={Input}
  //       label='First name'
  //       placeholder='First name'
  //     />
  //     <Form.Field
  //       id='form-input-control-last-name'
  //       control={Input}
  //       label='Last name'
  //       placeholder='Last name'
  //     />
  //     <Form.Field
  //       id='form-input-control-last-name'
  //       control={Input}
  //       label='Phone number'
  //       placeholder='Phone number'
  //     />
  //   </Form.Group>
  //   <Form.Field
  //     id='form-textarea-control-opinion'
  //     control={TextArea}
  //     label='Message'
  //     placeholder='Message'
  //   />
  //   <Form.Field
  //     id='form-input-control-error-email'
  //     control={Input}
  //     label='Email'
  //     placeholder='joe@schmoe.com'
  //     error={{
  //       content: 'Please enter a valid email address',
  //       pointing: 'below',
  //     }}
  //   />
  //   <Form.Field
  //     id='form-button-control-public'
  //     control={Button}
  //     content='Confirm'
  //     label='Label with htmlFor'
  //   />
  // </Form>
  )
  
}

export default EmailForm;