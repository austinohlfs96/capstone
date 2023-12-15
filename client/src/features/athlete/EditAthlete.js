import React, {useState, useCallback, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Input } from 'semantic-ui-react';
import { patchAthlete, fetchCurrentUser} from '../coach/coachSlice';
import { getToken, checkToken } from '../../utils/main';
import { useToasts } from 'react-toast-notifications';



const EditAthlete = ({ athlete, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coach = useSelector((state) => state.coach.data);
  const { addToast } = useToasts();
  const handleNewError = useCallback((error) => {
    addToast(error, { appearance: 'error', autoDismiss: true });
  }, [addToast]);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

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

  const sendRequest = () => {
    if (!getToken() || !checkToken()) {
      handleNewError('User not logged in');
      navigate('/')
      return;
    }

    fetch(`http://127.0.0.1:5555/athlete/${athlete.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(res => {
      if (res.ok) {
          res.json().then(athlete => {
            dispatch(patchAthlete(athlete));
            onClose();
          })
      } else {
          res.json().then(errorObj => {
            console.log("error", errorObj)
          handleNewError(errorObj.message);
        });
      }
      })
    };

  const handleEditFormSubmit = () => {
    sendRequest()
    }
 
  return (
   
    <Form onSubmit={() => handleEditFormSubmit(formData)}>
    <Form.Field>
      <label>Athlete Name</label>
      <Input
        name='name'
        placeholder='Enter athlete name'
        value={formData.name}
        onChange={(e, { value }) => setFormData({ ...formData, name: value })}
      />
    </Form.Field>
    <Form.Field>
      <label>Athlete Age</label>
      <Input name="age"
              placeholder="Enter athlete age"
              value={formData.age}
              onChange={(e, { value }) => setFormData({ ...formData, age: value })} />
    </Form.Field>
    <Form.Field>
      <label>Athlete Height</label>
      <Input name="height"
              placeholder="Enter athlete height"
              value={formData.height}
              onChange={(e, { value }) => setFormData({ ...formData, height: value })} />
    </Form.Field>
    <Form.Field>
      <label>Athlete Weight</label>
      <Input name="weight"
              placeholder="Enter athlete weight"
              value={formData.weight}
              onChange={(e, { value }) => setFormData({ ...formData, wieght: value })} />
    </Form.Field>
    <Form.Field>
      <label>Athlete Gender</label>
      <Input name="gender"
              placeholder="Enter athlete gender"
              value={formData.gender}
              onChange={(e, { value }) => setFormData({ ...formData, gender: value })} />
    </Form.Field>
    <Form.Field>
      <label>Athlete Boot Size</label>
      <Input name="boot_size"
              placeholder="Enter athlete boot size"
              value={formData.boot_size}
              onChange={(e, { value }) => setFormData({ ...formData, boot_size: value })} />
    </Form.Field>
    <Form.Field>
      <label>Athlete Stance</label>
      <Input name="stance"
              placeholder="Enter athlete stance"
              value={formData.stance}
              onChange={(e, { value }) => setFormData({ ...formData, stance: value })} />
    </Form.Field>
    <Form.Field>
      <label>Athlete DIsciplines</label>
      <Input name="discipline"
              placeholder="Enter athlete disciplines"
              value={formData.discipline}
              onChange={(e, { value }) => setFormData({ ...formData, discipline: value })} />
    </Form.Field>
    <Form.Field>
      <label>Upload Athlete Photos</label>
      <Input name="profile_picture"
              placeholder="Enter img url for picture"
              value={formData.profile_picture}
              onChange={(e, { value }) => setFormData({ ...formData, profile_picture: value })} />
    </Form.Field>
    {/* Add more fields as needed */}
    <Button type='submit'>Save Changes</Button>
    <Button onClick={onClose}>Close</Button>
  </Form>
  
  

  )
}



export default EditAthlete;