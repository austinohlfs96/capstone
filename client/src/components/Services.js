import React, { useState, useEffect } from 'react';
import { Item } from 'semantic-ui-react';
import Head from './Header';

const Services = () => {
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

  return (
    <div className='modal'>
      <Head />
      <div id="services">
        <Item.Group>
          {services.map((service) => (
            <Item key={service.id}>
              <Item.Content>
                <Item.Header>{service.name}</Item.Header>
                <Item.Meta>
                  <span className='price'>{`$${service.price}`}</span>
                  <span className='stay'>{service.duration}</span>
                </Item.Meta>
                <Item.Description>{service.description}</Item.Description>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </div>
    </div>
  );
};

export default Services;
