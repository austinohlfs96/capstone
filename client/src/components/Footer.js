import React from 'react';
import { Image } from 'semantic-ui-react';

const Footer = () => {
  return (
    <div className="ui inverted vertical footer segment">
      <div className="ui container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Valknut.svg/1200px-Valknut.svg.png' style={{ width: '20px', height: '20px', marginRight: '10px' }} />
          <p style={{ margin: '0' }}>Æsir Speed Techs 2023. All Rights Reserved</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ margin: '0 10px' }}>Follow us on social media:</p>
          <i className="instagram icon" style={{ margin: '0 10px' }}></i>
          <i className="facebook icon" style={{ margin: '0 10px' }}></i>
          <i className="twitter icon" style={{ margin: '0 10px' }}></i>
        </div>
      </div>
    </div>
  );
};

export default Footer;


