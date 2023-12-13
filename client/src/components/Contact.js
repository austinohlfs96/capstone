import { Segment, Image } from 'semantic-ui-react'
import Head from "./Header";
import EmailForm from './EmailForm';


const src = '/images/wireframe/image-text.png'

const Contact = () => {
  return (
    <div className='modal'>
      <Head/>
      <Segment>
        <EmailForm/>
      </Segment>
      
    </div>
  )
}

export default Contact;