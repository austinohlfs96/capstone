import { Segment, Image, Grid } from 'semantic-ui-react'
import Head from "./Header";
import EmailForm from './EmailForm';


const src = '/images/wireframe/image-text.png'

const Contact = () => {
  return (
    <>
      <Head/>
      <div className='modal'>
      <Grid.Column width={12}>
      <Segment id="emailContainer">
        <EmailForm/>
      </Segment>
      </Grid.Column>
    </div>
    </>
  )
}

export default Contact;