import {useState, useEffect} from "react"
import {useSelector} from "react-redux"
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, Menu, Segment, Button, Form, Input } from 'semantic-ui-react'
import EditCoachForm from './EditCoachForm'
import AddAthleteForm from "../athlete/AddAthleteForm"
import AthleteCards from "../athlete/AthleteCards"



const MenuExampleTabularOnLeft = () => {
  const navigate = useNavigate()
  // const athlete = useSelector((state) => state.athlete.data)
  const location = useLocation();
  const [menuState, setMenuState] = useState({activeItem: 'athletes'})

  const handleItemClick = (e, { name }) => setMenuState({ activeItem: name })

  


  const { activeItem } = menuState

  useEffect(() => {
    if (location.pathname === '/editathlete') {
      setMenuState({ activeItem: 'add-athlete' });
    } else {
      setMenuState({ activeItem: 'athletes' }); // Set the default active item for other routes
    }
  }, [location.pathname]);

    if (activeItem === 'book-athlete-services') {
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
              name='book-athlete-services'
              active={activeItem === 'book-athlete-services'}
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
          <Form>
          
          <Form.Field>
            <label>Username</label>
            <Input placeholder='Enter your username' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Input type='password' placeholder='Enter your password' />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
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
              name='book-athlete-services'
              active={activeItem === 'book-athlete-services'}
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
            This is an stretched grid column. This segment will always match the
            tab height
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
              name='book-athlete-services'
              active={activeItem === 'book-athlete-services'}
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
              name='book-athlete-services'
              active={activeItem === 'book-athlete-services'}
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
              name='book-athlete-services'
              active={activeItem === 'book-athlete-services'}
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