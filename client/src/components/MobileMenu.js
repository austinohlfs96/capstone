// MobileMenu.js

import React from 'react';
import { Button, Icon } from 'semantic-ui-react';


const MobileMenu = ({ toggleMenu, navigate, coach, handleLogout }) => (
  <div className="mobile-menu">
    <Icon name="close" size="large" onClick={toggleMenu} style={{ cursor: 'pointer', alignSelf: 'flex-end', marginRight: '10px' }} />
    <Button secondary onClick={() => navigate('/about')}>About</Button>
    <Button secondary onClick={() => navigate('/services')}>Services</Button>
    <Button secondary onClick={() => navigate('/gallery')}>Gallery</Button>
    <Button secondary onClick={() => navigate('/athletespotlight')}>Athlete Spotlight</Button>
    <Button secondary onClick={() => navigate('/contact')}>Contact Us</Button>
    {!coach && (
  <>
    <Button primary onClick={() => navigate('/login')}>Login</Button>
    <Button secondary onClick={() => navigate('/signup')}>Register</Button>
  </>
)}
    {coach && (
  <>
    <Button primary onClick={() => navigate('/userHome')}>Profile</Button>
    <Button secondary onClick={handleLogout}>Logout</Button>
  </>
)}
  </div>
);

export default MobileMenu;
