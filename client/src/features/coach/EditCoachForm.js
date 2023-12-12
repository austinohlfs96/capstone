import { useState } from 'react'
import { Grid, Menu, Segment, Button, Form, Input } from 'semantic-ui-react'
import {useSelector, useDispatch} from "react-redux"
import {setCurrentCoach} from "./coachSlice"

const EditCoachForm = () => {
  const coach = useSelector((state) => state.coach.data)
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: coach.name,
    email: coach.email,
    team: coach.team,
    profile_picture: coach.profile_picture,
  });

  const handleInputChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Perform PATCH request to update coach on the backend
    fetch(`http://127.0.0.1:5555/coach/${coach.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // Include any necessary authentication headers (e.g., JWT token)
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update coach');
        }
        return res.json();
      })
      .then((coach) => {
        // Dispatch an action to update the Redux store with the new coach data
        dispatch(setCurrentCoach(coach));
      })
      .catch((error) => {
        console.error('Error updating coach:', error.message);
      });
  };

  return (
    <Grid.Column stretched width={12}>
      <Segment>
        <Form onSubmit={handleSubmit}>
          {/* Your form fields go here */}
          <Form.Field>
            <label>Edit Name</label>
            <Input
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <Input
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Team</label>
            <Input
              name="team"
              placeholder="Enter your team name"
              value={formData.team}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Profile Photo</label>
            <Input
              name="profile_picture"
              placeholder="Enter img url for picture"
              value={formData.profile_picture}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
        <Button secondary >DELETE Account</Button>
      </Segment>
    </Grid.Column>
  );
};

export default EditCoachForm;