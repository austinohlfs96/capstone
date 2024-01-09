import {useState, useEffect} from "react"
import { useLocation } from 'react-router-dom';
import { Grid, Menu, Segment } from 'semantic-ui-react'
import EditCoachForm from './EditCoachForm'
import AddAthleteForm from "../athlete/AddAthleteForm"
import AthleteCards from "../athlete/AthleteCards"
import BookAppointment from "../appointment/BookAppiontment";
import CoachAppointments from "../appointment/CoachAppointments";

const MenuExampleTabularOnLeft = () => {
  const location = useLocation();
  const [menuState, setMenuState] = useState({activeItem: 'athletes'})

  const handleItemClick = (e, { name }) => setMenuState({ activeItem: name })

  const { activeItem } = menuState

  useEffect(() => {
    if (location.pathname === '/editathlete') {
      setMenuState({ activeItem: 'add-athlete' });
    } else {
      setMenuState({ activeItem: 'athletes' });
    }
  }, [location.pathname]);

    if (activeItem === 'book-appointment') {
      return (
        <div style={{ marginTop: '20px', marginBottom: "104px" }}>
        <Grid>
        <Grid.Column width={4}>
        <Menu fluid vertical tabular style={{ background: 'rgba(255, 255, 255, 0.8)' }}>
          <Menu.Item
              name='athletes'
              active={activeItem === 'athletes'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='book-appointment'
              active={activeItem === 'book-appointment'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='view-appointments'
              active={activeItem === 'view-appointments'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='add-athlete'
              active={activeItem === 'add-athlete'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='edit-account'
              active={activeItem === 'edit-account'}
              onClick={handleItemClick}
            />
          </Menu>
          
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment style={{ marginTop: '-20vh', maxWidth: '664px' }}>
            <BookAppointment handleItemClick={handleItemClick}/>
          </Segment>
        </Grid.Column>
      </Grid>
        </div>
    )}

    if (activeItem === 'view-appointments') {
      return (
        <div style={{ marginTop: '20px', marginBottom: "30px" }}>
        <Grid>
        <Grid.Column width={4}>
        <Menu fluid vertical tabular style={{ background: 'rgba(255, 255, 255, 0.8)' }}>
          <Menu.Item
              name='athletes'
              active={activeItem === 'athletes'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='book-appointment'
              active={activeItem === 'book-appointment'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='view-appointments'
              active={activeItem === 'view-appointments'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='add-athlete'
              active={activeItem === 'add-athlete'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='edit-account'
              active={activeItem === 'edit-account'}
              onClick={handleItemClick}
            />
          </Menu>
          
        </Grid.Column>

        <Grid.Column stretched width={12}>
        <Segment style={{ marginTop: '-30vh', maxWidth: '664px' }}>
          <CoachAppointments handleItemClick={handleItemClick}/>
          </Segment>
        </Grid.Column>
      </Grid>
        </div>
    )}

    if (activeItem === 'add-athlete') {
      return (
        <div style={{ marginTop: '20px', marginBottom: "30px" }}>
        <Grid>
        <Grid.Column width={4}>
        <Menu fluid vertical tabular style={{ background: 'rgba(255, 255, 255, 0.8)' }}>
          <Menu.Item
              name='athletes'
              active={activeItem === 'athletes'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='book-appointment'
              active={activeItem === 'book-appointment'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='view-appointments'
              active={activeItem === 'view-appointments'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='add-athlete'
              active={activeItem === 'add-athlete'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='edit-account'
              active={activeItem === 'edit-account'}
              onClick={handleItemClick}
            />
          </Menu>
          
        </Grid.Column>
        <Grid.Column width={12}>
        <Segment style={{ marginTop: '-37vh', maxWidth: '664px'}}>
          <AddAthleteForm handleItemClick={handleItemClick} />
          </Segment>
        </Grid.Column>  
      </Grid>
        </div>
    )}

    if (activeItem === 'edit-account') {
      return (
        <div style={{ marginTop: '20px', marginBottom: "111px" }}>
        <Grid>
        <Grid.Column width={4}>
        <Menu fluid vertical tabular style={{ background: 'rgba(255, 255, 255, 0.8)' }}>
          <Menu.Item
              name='athletes'
              active={activeItem === 'athletes'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='book-appointment'
              active={activeItem === 'book-appointment'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='view-appointments'
              active={activeItem === 'view-appointments'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='add-athlete'
              active={activeItem === 'add-athlete'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='edit-account'
              active={activeItem === 'edit-account'}
              onClick={handleItemClick}
            />
          </Menu>
          
        </Grid.Column >
        <Grid.Column width={12}>
        <Segment style={{ marginTop: '-36vh', maxWidth: '664px' }}>
         <EditCoachForm handleItemClick={handleItemClick}/>
        </Segment>
        </Grid.Column>   
      </Grid>
        </div>
    )}

    return (
      <div style={{ marginTop: '20px', marginBottom: "30px" }}>
      <Grid>
       
        <Grid.Column width={4}>
          
          <Menu fluid vertical tabular style={{ background: 'rgba(255, 255, 255, 0.8)' }}>
          <Menu.Item
              name='athletes'
              active={activeItem === 'athletes'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='book-appointment'
              active={activeItem === 'book-appointment'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='view-appointments'
              active={activeItem === 'view-appointments'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='add-athlete'
              active={activeItem === 'add-athlete'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='edit-account'
              active={activeItem === 'edit-account'}
              onClick={handleItemClick}
            />
          </Menu>
          
          
        </Grid.Column>
       
        <Grid.Column width={12}>
          <Segment style={{ marginTop: '-30vh', maxWidth: '664px'}}>
          <AthleteCards handleItemClick={handleItemClick}/>
          </Segment>
         </Grid.Column>
      </Grid>
      </div>
    )
  }



export default MenuExampleTabularOnLeft;