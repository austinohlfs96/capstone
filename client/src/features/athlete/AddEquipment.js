import React, {useState} from 'react';
import {  useDispatch } from 'react-redux';
import { Button, Form, Input } from 'semantic-ui-react';
import {  patchAthlete } from '../coach/coachSlice';
import { addEquipmentToAthlete } from './AthleteSlice';


const AddEquipment = ({ athlete, onCloseAddEquipmentModal }) => {

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    athlete_id: athlete.id,
    athlete_name: athlete.name,
    type: '',
    manifacture: '',
    model: '',
    year: '',
    length: '',
    width: '',
  });


  const handleAddEquipmentFormSubmit = () => {
    // Make a POST request to the server
    const formDataWithoutExcludedField = { ...formData };
    delete formDataWithoutExcludedField.athlete_name;
    fetch('http://127.0.0.1:5555/equipment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataWithoutExcludedField),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to add equipment');
        }
        return res.json();
      })
      .then((equipment) => {
        const updatedAthlete = {
          ...athlete,
          equipment: [...athlete.equipment, equipment],
        };
        console.log('Equipment added successfully:', equipment);
        dispatch(patchAthlete(updatedAthlete));
        onCloseAddEquipmentModal(); // Close the modal after submitting
      })
      .catch((error) => {
        console.error('Error adding equipment:', error.message);
      });
  };


  const title = 'USER HOME'
  return (
    
    <Form onSubmit={handleAddEquipmentFormSubmit}>
    <Form.Field>
      <label>Athlete Name</label>
      <Input
        name="athlete_name"
        placeholder="Enter equipment name"
        value={formData.athlete_name}
        // onChange={(e, { athlete_name, value }) => setFormData({ ...formData, [athlete_name]: value })}
      />
    </Form.Field>
    <Form.Field>
      <label>Type</label>
      <Input
        name="type"
        placeholder="Enter equipment type"
        value={formData.type}
        onChange={(e, { value }) => setFormData({ ...formData, type: value })}
      />
    </Form.Field>
    <Form.Field>
      <label>Manifacturer</label>
      <Input
        name="manifacture"
        placeholder="Enter equipment manifacture"
        value={formData.manifacture}
        onChange={(e, { value }) =>
          setFormData({ ...formData, manifacture: value })
        }
      />
    </Form.Field>
    <Form.Field>
      <label>Model</label>
      <Input
        name="model"
        placeholder="Enter equipment model"
        value={formData.model}
        onChange={(e, { value }) =>
          setFormData({ ...formData, model: value })
        }
      />
    </Form.Field>
    <Form.Field>
      <label>Year</label>
      <Input
        name="year"
        placeholder="Enter equipment year"
        value={formData.year}
        onChange={(e, { value }) =>
          setFormData({ ...formData, year: value })
        }
      />
    </Form.Field>
    <Form.Field>
      <label>Length</label>
      <Input
        name="length"
        placeholder="Enter equipment length"
        value={formData.length}
        onChange={(e, { value }) =>
          setFormData({ ...formData, length: value })
        }
      />
    </Form.Field>
    <Form.Field>
      <label>Width</label>
      <Input
        name="width"
        placeholder="Enter equipment width"
        value={formData.width}
        onChange={(e, { value }) =>
          setFormData({ ...formData, width: value })
        }
      />
    </Form.Field>
    <Button type='submit'>Add Equipment</Button>
    <Button onClick={onCloseAddEquipmentModal}>Close</Button>
  </Form> 

  )
}

export default AddEquipment;