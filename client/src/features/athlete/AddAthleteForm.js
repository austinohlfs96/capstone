import React, { useState, useEffect } from 'react';
import { Grid, Segment, Button, Form, Input } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { addAthleteToCoach } from '../coach/coachSlice';




const AddAthleteForm = ({handleItemClick, athlete}) => {
  const coachId = useSelector((state) => state.coach.data.id);
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    gender: '',
    boot_size: '',
    stance: '',
    discipline: '',
    profile_picture: '',
  });
console.log(athlete)
  useEffect(() => {
    if (athlete) {
      // If editing an athlete, set the form data to the athlete's details
      setFormData({
        name: athlete.name,
        age: athlete.age,
        height: athlete.height,
        weight: athlete.weight,
        gender: athlete.gender,
        boot_size: athlete.boot_size,
        stance: athlete.stance,
        discipline: athlete.discipline,
        profile_picture: athlete.profile_picture,
      });
    }
  }, [athlete]);

  const handleInputChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = { ...formData, coaches_id: coachId };
    const requestMethod = athlete ? 'PATCH' : 'POST';
    const apiUrl = athlete ? `http://127.0.0.1:5555/athlete/${athlete.id}` : 'http://127.0.0.1:5555/athletes';


    fetch(apiUrl, {
      method: requestMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          debugger
          throw new Error('Failed to create athlete');
        }
        return response.json();
      })
      .then((createdAthlete) => {
        console.log('Created athlete:', createdAthlete);
        dispatch(addAthleteToCoach(createdAthlete))
        handleItemClick(null, {name: "athletes"})
        
      })
      .catch((error) => {
        console.error('Error creating athlete:', error.message);
      });
  };

  return (
    <Grid.Column stretched width={12}>
    <Segment>
    <Form onSubmit={handleSubmit}>
    <Form.Field>
      <label>Athlete Name</label>
      <Input name="name"
              placeholder="Enter athlete name"
              value={formData.name}
              onChange={handleInputChange} />
    </Form.Field>
    <Form.Field>
      <label>Athlete Age</label>
      <Input name="age"
              placeholder="Enter athlete age"
              value={formData.age}
              onChange={handleInputChange} />
    </Form.Field>
    <Form.Field>
      <label>Athlete Height</label>
      <Input name="height"
              placeholder="Enter athlete height"
              value={formData.height}
              onChange={handleInputChange} />
    </Form.Field>
    <Form.Field>
      <label>Athlete Weight</label>
      <Input name="weight"
              placeholder="Enter athlete weight"
              value={formData.weight}
              onChange={handleInputChange} />
    </Form.Field>
    <Form.Field>
      <label>Athlete Gender</label>
      <Input name="gender"
              placeholder="Enter athlete gender"
              value={formData.gender}
              onChange={handleInputChange} />
    </Form.Field>
    <Form.Field>
      <label>Athlete Boot Size</label>
      <Input name="boot_size"
              placeholder="Enter athlete boot size"
              value={formData.boot_size}
              onChange={handleInputChange} />
    </Form.Field>
    <Form.Field>
      <label>Athlete Stance</label>
      <Input name="stance"
              placeholder="Enter athlete stance"
              value={formData.stance}
              onChange={handleInputChange} />
    </Form.Field>
    <Form.Field>
      <label>Athlete DIsciplines</label>
      <Input name="discipline"
              placeholder="Enter athlete disciplines"
              value={formData.discipline}
              onChange={handleInputChange} />
    </Form.Field>
    <Form.Field>
      <label>Upload Athlete Photos</label>
      <Input name="profile_picture"
              placeholder="Enter img url for picture"
              value={formData.profile_picture}
              onChange={handleInputChange} />
    </Form.Field>
    <Button >Add Equipment</Button>
      <Button type='submit'>Submit</Button>
  </Form>
    </Segment>
  </Grid.Column>
  );
};

export default AddAthleteForm;