import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Item } from 'semantic-ui-react';
import Head from './Header';

const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Define an async function to fetch services from the server
    const fetchServices = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5555/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }

        const data = await response.json();
        setServices(data); // Assuming the response is an array of services
      } catch (error) {
        console.error('Error fetching services:', error.message);
      }
    };

    // Call the fetchServices function when the component mounts
    fetchServices();
  }, []); // Empty dependency array ensures the effect runs only once, like componentDidMount

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
