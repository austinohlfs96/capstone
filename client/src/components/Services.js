import React, { useState, useEffect } from 'react';
import { Item, Image, Segment, Responsive } from 'semantic-ui-react';
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
    <>
      <Head />
      <div className='modal'>
        <div id="services">
          <Segment className="services-segment" >
            <h1>Services</h1>
            <Item.Group>
              {services.map((service) => (
                <Segment key={service.id} className="service-item">
                  <Image src={service.image} size='medium' floated='left' />
                  <Item>
                    <Item.Content>
                      <h3>{service.name}</h3>
                      <Item.Meta>
                        <span className='price'>{`Price: $${service.price}`}</span>
                      </Item.Meta>
                      <span className='stay'>Average Turn Around Time: {service.average_turn_around}</span>
                      <Item.Description>{service.description}</Item.Description>
                    </Item.Content>
                  </Item>
                </Segment>
              ))}
            </Item.Group>
          </Segment>
        </div>
      </div>
    </>
  );
};

export default Services;
