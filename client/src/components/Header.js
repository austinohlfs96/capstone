import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Header, Segment, Button, Image } from 'semantic-ui-react'

function Head() {
  const navigate = useNavigate()
  return (
    <div className="App">
      <Segment>
    <Header as='h3' textAlign='right'>
    <Button primary onClick={() => navigate('/login')}>Login</Button>
    <Button secondary onClick={() => navigate('/signup')}>Register</Button>
    </Header>
    <Header as='h3' textAlign='left'>
    <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Valknut.svg/1200px-Valknut.svg.png' size='small' />
      Æsir Performance Tunes
    </Header>
    <Header as='h3' textAlign='justified'>
    <Button secondary onClick={() => navigate('/')}>About</Button>
    <Button secondary onClick={() => navigate('/services')}>Services</Button>
    <Button secondary>Gallery</Button>
    <Button secondary>Rider Spotlight</Button>
    <Button secondary>Contact Us</Button>
    </Header>
  </Segment>
    </div>
  );
}

export default Head;