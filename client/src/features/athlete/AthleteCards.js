import React, {useState, useEffect, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Image, Button, Modal, Grid, Header, Dropdown } from 'semantic-ui-react';
import { deleteAthleteToCoach, fetchCurrentUser } from '../coach/coachSlice';
import {setCurrentAthlete} from "./AthleteSlice"
import { useToasts } from 'react-toast-notifications';
import { getToken } from '../../utils/main';
import { checkToken } from '../../utils/main';
import EditAthlete from './EditAthlete'
import AddEquipment from './AddEquipment';


const AthleteCards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coach = useSelector((state) => state.coach.data);
  const [athlete, setAthlete] = useState(null)
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addEquipmentModalOpen, setAddEquipmentModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('equipment');
  const handleCategoryChange = (e, { value }) => {
    setSelectedCategory(value);
  };
  const { addToast } = useToasts();
  const handleNewError = useCallback((error) => {
    addToast(error, { appearance: 'error', autoDismiss: true });
  }, [addToast]);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  
  if (!coach || !coach.athletes) {
    return null;
  }

  const coachAthletes = coach.athletes;
  console.log(coachAthletes)

  const handleRemoveAthlete = (e,athleteId) => {
    e.stopPropagation();
    if (!getToken() || !checkToken()) {
      handleNewError('User not logged in');
      navigate('/')
      return;
    }
    const choice = prompt(`Are you sure want to delete this athlete? This will delete all this athlete's equipment and service data. There is no coming back from this!\nType YES to continue.`);
    if (!choice) {
      return;
    } else if (choice.toLowerCase() === 'yes') {
      fetch(`http://127.0.0.1:5555/athlete/${athleteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to delete athlete');
          }
          return response.json();
        })
        .then(() => {
          dispatch(deleteAthleteToCoach(athleteId));
        })
        .catch((error) => {
          console.error(error);
        });
    };
  }
  

  const handleEditAthlete = (athlete, event) => {
    event.stopPropagation(); 
    setAthlete(athlete);
    dispatch(setCurrentAthlete(athlete));
    setEditModalOpen(true);
  };
  const onClose = () => {
    setEditModalOpen(false)
  }

  const handleAddEquipment = (athlete, event) => {
    event.stopPropagation(); 
    setAthlete(athlete);
    dispatch(setCurrentAthlete(athlete));
    setAddEquipmentModalOpen(true);
  };
  
  

  const onCloseAddEquipmentModal = () => {
    setAddEquipmentModalOpen(false);
  };

  return (
    <>
    {/* <Modal.Header><h1>Athletes</h1></Modal.Header> */}
    <Card.Group>
      {coachAthletes.map((athlete) => (
        <Card key={athlete.id} onClick={() => setSelectedAthlete(athlete)}>
          <Image src={athlete.profile_picture} wrapped ui={false} size='small'/>
          
          <Card.Content>
          <Button secondary style={{ position: 'absolute', top: '5px', right: '5px' }}
          onClick={(e) => handleRemoveAthlete(e, athlete.id)}
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
            <Card.Description>{`Height: ${athlete.height}`}</Card.Description>
            <Card.Description>{`Weight: ${athlete.weight}`}</Card.Description>
            <Card.Description>{`Boot Size: ${athlete.boot_size}`}</Card.Description>
            <Card.Description>{`Stance: ${athlete.stance}`}</Card.Description>
            <Card.Description>{`Disciplines: ${athlete.discipline}`}</Card.Description>
            <Button onClick={(event) => handleAddEquipment(athlete, event)}>Add Equipment</Button>
            <Button type='submit' onClick={(event) => handleEditAthlete(athlete, event)}>Edit Athlete</Button>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>

    <Modal open={!!selectedAthlete} size='small' onClose={() => setSelectedAthlete(null)}>
  <Modal.Header>{selectedAthlete?.name}</Modal.Header>
  <Modal.Content>
    <Grid columns={3} stackable>
      <Grid.Column>
        <Image src={selectedAthlete?.profile_picture} wrapped ui={true} size='small' />
      </Grid.Column>
      <Grid.Column>
        <Card.Meta>
          <span className='date'>{`Age: ${selectedAthlete?.age}`}</span>
        </Card.Meta>
        <Card.Description>{`Gender: ${selectedAthlete?.gender}`}</Card.Description>
        <Card.Description>{`Height: ${selectedAthlete?.height}`}</Card.Description>
        <Card.Description>{`Weight: ${selectedAthlete?.weight}`}</Card.Description>
        <Card.Description>{`Boot Size: ${selectedAthlete?.boot_size}`}</Card.Description>
        <Card.Description>{`Stance: ${selectedAthlete?.stance}`}</Card.Description>
        <Card.Description>{`Disciplines: ${selectedAthlete?.discipline}`}</Card.Description>
      </Grid.Column>
    </Grid>
    <Dropdown
      placeholder='Select Category'
      selection
      options={[
        { key: 'equipment', text: 'Equipment', value: 'equipment' },
        { key: 'services', text: 'Services', value: 'services' },
      ]}
      onChange={handleCategoryChange}
      value={selectedCategory}
    />
    <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
      {selectedCategory === 'equipment' && (
        <Card.Group>
          {selectedAthlete?.equipment.map((item) => (
            <Card key={item.id}>
              <Card.Content>
                <Card.Header>{item.type}</Card.Header>
                <Card.Description>{`Manifacturer: ${item.manifacture}`}</Card.Description>
                <Card.Description>{`Model: ${item.model}`}</Card.Description>
                <Card.Description>{`Year: ${item.year}`}</Card.Description>
                <Card.Description>{`Lenght: ${item.lenght}`}</Card.Description>
                <Card.Description>{`Width: ${item.width}`}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      )}
      {selectedCategory === 'services' && (
        <Card.Group>
          {selectedAthlete?.athlete_services.map((service) => (
            <Card key={service.id}>
              <Card.Content>
                <Card.Header>{service.services.name}</Card.Header>
                <Card.Meta>{service.equipment.manifacture}: {service.equipment.model}</Card.Meta>
                <Card.Meta>Tuned for: {service.discipline}</Card.Meta>
                <Card.Meta>Technician Notes: {service.technicain_notes}</Card.Meta>
                <Card.Description>Notes: {service.notes}</Card.Description>
                <Card.Description>Review: {service.reviews}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      )}
    </div>
  </Modal.Content>
</Modal>


    <Modal open={editModalOpen}  size='small'>
        <Modal.Header>Edit Athlete</Modal.Header>
        <Modal.Content>
          <EditAthlete athlete={athlete} onClose={onClose}/>
        </Modal.Content>
      </Modal>

      <Modal open={addEquipmentModalOpen} size="small">
        <Modal.Header>Add Equipment</Modal.Header>
        <Modal.Content>
          <AddEquipment onCloseAddEquipmentModal={onCloseAddEquipmentModal} athlete={athlete}/>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default AthleteCards;
