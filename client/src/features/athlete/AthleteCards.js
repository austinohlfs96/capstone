import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Image, Button, Modal } from 'semantic-ui-react';
import { deleteAthleteToCoach } from '../coach/coachSlice';
import {setCurrentAthlete} from "./AthleteSlice"
import EditAthlete from './EditAthlete'
import AddEquipment from './AddEquipment';

const AthleteCards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coach = useSelector((state) => state.coach.data);
  const [athlete, setAthlete] = useState(null)

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addEquipmentModalOpen, setAddEquipmentModalOpen] = useState(false);
  

console.log(coach)
  if (!coach || !coach.athletes) {
    return null;
  }

  const coachAthletes = coach.athletes;
  console.log(coachAthletes)

  const handleRemoveAthlete = (athleteId) => {
    // Make a delete request to your server
    fetch(`http://127.0.0.1:5555/athlete/${athleteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers needed (e.g., authentication token)
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete athlete');
        }
        return response.json();
      })
      .then(() => {
        // Dispatch a Redux action to update the state
        dispatch(deleteAthleteToCoach(athleteId));
      })
      .catch((error) => {
        console.error(error);
        // Handle error as needed
      });
  };

  const handleEditAthlete = (athlete) => {
    setAthlete(athlete)
    dispatch(setCurrentAthlete(athlete));
    setEditModalOpen(true);
  };

  const onClose = () => {
    setEditModalOpen(false)
  }

  const handleAddEquipment = (athlete) => {
    setAthlete(athlete)
    dispatch(setCurrentAthlete(athlete))
    setAddEquipmentModalOpen(true);
  };

  const onCloseAddEquipmentModal = () => {
    setAddEquipmentModalOpen(false);
  };

  return (
    <>
    <Card.Group>
      {coachAthletes.map((athlete) => (
        <Card key={athlete.id}>
          <Image src={athlete.profile_picture} wrapped ui={false} size='small'/>
          
          <Card.Content>
          <Button secondary style={{ position: 'absolute', top: '5px', right: '5px' }}
          onClick={() => handleRemoveAthlete(athlete.id)}
          >
          X
        </Button>
            <Card.Header>{athlete.name}</Card.Header>
            <Card.Meta>
              <span className='date'>{`Age: ${athlete.age}`}</span>
            </Card.Meta>
            <Card.Description>{`Peices of equipment: ${athlete.equipment ? athlete.equipment.length : 0}`}
            </Card.Description>
            <Card.Description>{`Gender: ${athlete.gender}`}</Card.Description>
            <Card.Description>{`Height: ${athlete.height}, Weight: ${athlete.weight}`}</Card.Description>
            <Card.Description>{`Boot Size: ${athlete.height}, Stance: ${athlete.stance}`}</Card.Description>
            <Card.Description>{`Disciplines: ${athlete.discipline}`}</Card.Description>
            <Button onClick={() => handleAddEquipment(athlete)}>Add Equipment</Button>
            <Button type='submit' onClick={() => handleEditAthlete(athlete)}>Edit Athlete</Button>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>

    <Modal open={editModalOpen}  size='small'>
        <Modal.Header>Edit Athlete</Modal.Header>
        <Modal.Content>
          <EditAthlete athlete={athlete} onClose={onClose}/>
          
        </Modal.Content>
      </Modal>

      <Modal open={addEquipmentModalOpen} size="small">
        {/* Content for Add Equipment Modal */}
        {/* Add your form or any content for adding equipment */}
        <Modal.Header>Add Equipment</Modal.Header>
        <Modal.Content>
          <AddEquipment onCloseAddEquipmentModal={onCloseAddEquipmentModal} athlete={athlete}/>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default AthleteCards;
