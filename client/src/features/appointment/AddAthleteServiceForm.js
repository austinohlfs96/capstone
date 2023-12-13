import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Input, Modal, Dropdown } from 'semantic-ui-react';
import { addServiceToAppointment } from './appointmentSlice';
import { patchAppointment, patchCoach } from '../coach/coachSlice';

const AddAthleteServiceForm = ({appointment, handleModalClose, setAppointment}) => {
  const dispatch = useDispatch()
  const [athlete, setAthlete] = useState({})
  const coach = useSelector((state) => state.coach.data);
  const coachAthletes = coach.athletes;
  const athleteEquipment = athlete.equipment || []
  console.log(appointment)
  const handleAthleteDropdownChange = (e, { value }) => {
    const selectedAthlete = coachAthletes.find((athlete) => athlete.id === value);
    setAthlete(selectedAthlete);
    console.log(athlete)
    setFormData({ ...formData, athlete_id: value });
  };

  const handleEquipmentDropdownChange = (e, { value }) => {
    const selectedEquipment = athleteEquipment.find((item) => item.id === value);
    setFormData({ ...formData, equipment_id: value });

  };

  const handleServiceDropdownChange = (e, { value }) => {
  
    setFormData({ ...formData, service_id: value });

  };

  const [services, setServices] = useState([]);

  useEffect(() => {
   
    const fetchServices = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5555/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }

        const data = await response.json();
        setServices(data); 
      } catch (error) {
        console.error('Error fetching services:', error.message);
      }
    };

   
    fetchServices();
  }, []);


  const [formData, setFormData] = useState({
    appointment_id: appointment.id,
    athlete_id: '', // Selected athlete value will be stored here
    equipment_id: '',
    service_id: '',
    discipline: '',
    notes: '',
  });

  const handleSubmit = (formData) => {
    // Make a POST request to the server
    fetch('http://127.0.0.1:5555/athlete-services', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to create appointment");
        }
        return res.json();
      })
     
      .then((newService) => {
        const updateAppointment = {
          ...appointment,
          athlete_services: [...appointment.athlete_services, newService],
        };
        dispatch(patchAppointment(updateAppointment))
        // dispatch(patchCoach(coach))
        setAppointment(updateAppointment)
        console.log('TEST6', updateAppointment)
        handleModalClose()
        // You can add logic here to handle the successful creation of the appointment
      })
      .catch((error) => {
        console.error("Error creating appointment:", error.message);
      });
  };



  return (
    <Form onSubmit={(e) => {
      e.preventDefault()
      handleSubmit(formData)}
      }>
      {/* <Form.Field>
      <label>Appointment ID</label>
      <Input
        name="appointment_id"
        placeholder="Enter equipment notes"
        value={formData.appointment_id}
        onChange={(e, { appointment_id, value }) =>
          setFormData({ ...formData, [appointment_id]: value })
        }
      />
    </Form.Field> */}
      <label>Athlete</label>
      <Form.Field>
      <Dropdown
          placeholder="Select Athlete"
          fluid
          search
          selection
          options={coachAthletes.map((athlete) => ({
            key: athlete.id,
            value: athlete.id,
            text: athlete.name,
          }))}
          value={formData.athlete_id}
          onChange={handleAthleteDropdownChange}
        />
        
      </Form.Field>
      <Form.Field>
        <label>Equipment</label>
        <Dropdown
          placeholder="Select Equipment"
          fluid
          search
          selection
          options={athleteEquipment.map((item) => ({
            key: item.id, // Assuming each equipment has a unique ID
            value: item.id, // Use equipment ID as the value
            text: item.model, // Display equipment name in the dropdown
          }))}
          value={formData.equipment_id}
          onChange={handleEquipmentDropdownChange}
        />
      </Form.Field>
    <Form.Field>
        <label>Equipment</label>
        <Dropdown
          placeholder="Select Equipment"
          fluid
          search
          selection
          options={services.map((service) => ({
            key: service.id, // Assuming each equipment has a unique ID
            value: service.id, // Use equipment ID as the value
            text: service.name, // Display equipment name in the dropdown
          }))}
          value={formData.service_id}
          onChange={handleServiceDropdownChange}
        />
      </Form.Field>
    <Form.Field>
      <label>Discipline</label>
      <Input
        name="disipline"
        placeholder="Enter equipment width"
        value={formData.discipline}
        onChange={(e, { value }) =>
          setFormData({ ...formData, discipline: value })
        }
      />
    </Form.Field>
    <Form.Field>
      <label>notes</label>
      <Input
        name="notes"
        placeholder="Enter equipment notes"
        value={formData.notes}
        onChange={(e, { value }) =>
          setFormData({ ...formData, notes: value })
        }
      />
    </Form.Field>
       <Button type="submit" >Submit Athlete Service</Button>
     </Form>
  )
}

export default AddAthleteServiceForm;