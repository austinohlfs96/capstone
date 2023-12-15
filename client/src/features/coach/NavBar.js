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
        <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
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
          <Segment>
            <BookAppointment/>
          </Segment>
        </Grid.Column>
      </Grid>
        
    )}

    if (activeItem === 'view-appointments') {
      return (
        <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
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
        <Segment>
          <CoachAppointments/>
          </Segment>
        </Grid.Column>
      </Grid>
        
    )}

    if (activeItem === 'add-athlete') {
      return (
        <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
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
        <><AddAthleteForm handleItemClick={handleItemClick} /></>
      </Grid>
        
    )}

    if (activeItem === 'edit-account') {
      return (
        <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
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
           <><EditCoachForm /></>
      </Grid>
        
    )}

    return (
      <div>
      <Grid>
       
        <Grid.Column width={4}>
          
          <Menu fluid vertical tabular>
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
         <AthleteCards />
         </Grid.Column>
      </Grid>
      </div>
    )
  }



export default MenuExampleTabularOnLeft;