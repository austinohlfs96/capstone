// MenuIcon.js

import React from 'react';
import { Icon } from 'semantic-ui-react';

const MenuIcon = ({ toggleMenu }) => (
  <Icon name="bars" size="large" onClick={toggleMenu} style={{ cursor: 'pointer' }} />
);

export default MenuIcon;
