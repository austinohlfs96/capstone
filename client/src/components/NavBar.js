import React, { Component } from 'react'
import { Grid, Menu, Segment, Button, Form, Input } from 'semantic-ui-react'


export default class MenuExampleTabularOnLeft extends Component {
  state = { activeItem: '' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    if (activeItem === 'book-athlete-services') {
      return (
        <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
          <Menu.Item
              name='athletes'
              active={activeItem === 'athletes'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='book-athlete-services'
              active={activeItem === 'book-athlete-services'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='view-appointments'
              active={activeItem === 'view-appointments'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='add-athlete'
              active={activeItem === 'add-athlete'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='edit-account'
              active={activeItem === 'edit-account'}
              onClick={this.handleItemClick}
            />
          </Menu>
          
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
          <Form>
          {/* Your form fields go here */}
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

    if (activeItem === 'add-athlete') {
      return (
        <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
          <Menu.Item
              name='athletes'
              active={activeItem === 'athletes'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='book-athlete-services'
              active={activeItem === 'book-athlete-services'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='view-appointments'
              active={activeItem === 'view-appointments'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='add-athlete'
              active={activeItem === 'add-athlete'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='edit-account'
              active={activeItem === 'edit-account'}
              onClick={this.handleItemClick}
            />
          </Menu>
          
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
          <Form>
          {/* Your form fields go here */}
          <Form.Field>
            <label>Athlete Name</label>
            <Input placeholder='Enter atrhlete name' />
          </Form.Field>
          <Form.Field>
            <label>Athlete Age</label>
            <Input placeholder='Enter athlete age' />
          </Form.Field>
          <Form.Field>
            <label>Athlete Height</label>
            <Input placeholder='Enter athlete height' />
          </Form.Field>
          <Form.Field>
            <label>Athlete Weight</label>
            <Input placeholder='Enter athlete weight' />
          </Form.Field>
          <Form.Field>
            <label>Athlete Gender</label>
            <Input placeholder='Enter atrhlete gender' />
          </Form.Field>
          <Form.Field>
            <label>Athlete Boot Size</label>
            <Input placeholder='Enter athlete boot size' />
          </Form.Field>
          <Form.Field>
            <label>Athlete Stance</label>
            <Input placeholder='Enter athlete stance' />
          </Form.Field>
          <Form.Field>
            <label>Athlete DIsciplines</label>
            <Input placeholder='Enter athlete disciplines' />
          </Form.Field>
          <Form.Field>
            <label>Upload Athlete Photos</label>
            <Input placeholder='Enter img url for picture' />
          </Form.Field>
          <Button >Add Equipment</Button>
          <Button type='submit'>Submit</Button>
        </Form>
          </Segment>
        </Grid.Column>
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
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='book-athlete-services'
              active={activeItem === 'book-athlete-services'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='view-appointments'
              active={activeItem === 'view-appointments'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='add-athlete'
              active={activeItem === 'add-athlete'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='edit-account'
              active={activeItem === 'edit-account'}
              onClick={this.handleItemClick}
            />
          </Menu>
          
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
          <Form>
          {/* Your form fields go here */}
          <Form.Field>
            <label>Edit Name</label>
            <Input placeholder='Enter your name' />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <Input placeholder='Enter your email' />
          </Form.Field>
          <Form.Field>
            <label>Team</label>
            <Input placeholder='Enter your team name' />
          </Form.Field>
          <Form.Field>
            <label>Profile Photo</label>
            <Input placeholder='Enter img url for picture' />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
          </Segment>
        </Grid.Column>
      </Grid>
        
    )}

    return (
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
          <Menu.Item
              name='athletes'
              active={activeItem === 'athletes'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='book-athlete-services'
              active={activeItem === 'book-athlete-services'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='view-appointments'
              active={activeItem === 'view-appointments'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='add-athlete'
              active={activeItem === 'add-athlete'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='edit-account'
              active={activeItem === 'edit-account'}
              onClick={this.handleItemClick}
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
    )
  }
}


