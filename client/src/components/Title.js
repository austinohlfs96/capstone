import { useNavigate } from 'react-router-dom';
import Head from "./Header";
const Title = () => {
  const navigate = useNavigate()
  return (
    <div className='modal'>
      <Head/>
      {/* <h1 className='modaltitle'>Welcome to Datesmith!</h1>
      <h3 className='modaltag'>Please select an option:</h3>
      <div id='loginButtons'>
        <button className='modalbutton' onClick={() => navigate('/login')}>Login</button>
        <button className='modalbutton' onClick={() => navigate('/signup')}>Sign Up</button>
      </div> */}
    </div>
  )
}

export default Title;