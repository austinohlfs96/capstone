import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Image, Button, Modal, Form, Input } from 'semantic-ui-react';
import { deleteAthleteToCoach, patchAthlete } from '../coach/coachSlice';
import {setCurrentAthlete} from "./AthleteSlice"



const EditAthlete = ({ athlete, onClose }) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coach = useSelector((state) => state.coach.data);
  
  

  const [editModalOpen, setEditModalOpen] = useState(false);

  const [formData, setFormData] = useState({
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
  console.log(coach)

  

  
  const handleEditFormSubmit = () => {
    fetch(`http://127.0.0.1:5555/athlete/${athlete.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update athlete');
        }
        return res.json();
      })
      .then((athlete) => {
        // Dispatch an action to update the Redux store with the new coach data
        dispatch(patchAthlete(athlete));
        onClose();
        
      })
      .catch((error) => {
        console.error('Error updating coach:', error.message);
      });
  };




console.log(coach)
  const title = 'USER HOME'
  return (
    
    <Form onSubmit={() => handleEditFormSubmit(formData.id)}>
    {/* Render your form fields here */}
    <Form.Field>
      <label>Athlete Name</label>
      <Input
        name='name'
        placeholder='Enter athlete name'
        value={formData.name}
        onChange={(e, { name, value }) => setFormData({ ...formData, [name]: value })}
      />
    </Form.Field>
    <Form.Field>
      <label>Athlete Age</label>
      <Input name="age"
              placeholder="Enter athlete age"
              value={formData.age}
              onChange={(e, { age, value }) => setFormData({ ...formData, [age]: value })} />
    </Form.Field>
    <Form.Field>
      <label>Athlete Height</label>
      <Input name="height"
              placeholder="Enter athlete height"
              value={formData.height}
              onChange={(e, { height, value }) => setFormData({ ...formData, [height]: value })} />
    </Form.Field>
    <Form.Field>
      <label>Athlete Weight</label>
      <Input name="weight"
              placeholder="Enter athlete weight"
              value={formData.weight}
              onChange={(e, { wieght, value }) => setFormData({ ...formData, [wieght]: value })} />
    </Form.Field>
    <Form.Field>
      <label>Athlete Gender</label>
      <Input name="gender"
              placeholder="Enter athlete gender"
              value={formData.gender}
              onChange={(e, { gender, value }) => setFormData({ ...formData, [gender]: value })} />
    </Form.Field>
    <Form.Field>
      <label>Athlete Boot Size</label>
      <Input name="boot_size"
              placeholder="Enter athlete boot size"
              value={formData.boot_size}
              onChange={(e, { boot_size, value }) => setFormData({ ...formData, [boot_size]: value })} />
    </Form.Field>
    <Form.Field>
      <label>Athlete Stance</label>
      <Input name="stance"
              placeholder="Enter athlete stance"
              value={formData.stance}
              onChange={(e, { stance, value }) => setFormData({ ...formData, [stance]: value })} />
    </Form.Field>
    <Form.Field>
      <label>Athlete DIsciplines</label>
      <Input name="discipline"
              placeholder="Enter athlete disciplines"
              value={formData.discipline}
              onChange={(e, { discipline, value }) => setFormData({ ...formData, [discipline]: value })} />
    </Form.Field>
    <Form.Field>
      <label>Upload Athlete Photos</label>
      <Input name="profile_picture"
              placeholder="Enter img url for picture"
              value={formData.profile_picture}
              onChange={(e, { profile_picture, value }) => setFormData({ ...formData, [profile_picture]: value })} />
    </Form.Field>
    {/* Add more fields as needed */}
    <Button type='submit'>Save Changes</Button>
    <Button onClick={onClose}>Close</Button>
  </Form> 

  )
}

export default EditAthlete;