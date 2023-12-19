import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useState, useCallback } from 'react';
import { addError } from "./coachSlice";
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useToasts } from 'react-toast-notifications';
import Head from "../../components/Header";
import { Button, Checkbox, Form, Image, Segment } from 'semantic-ui-react'

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { addToast } = useToasts();
  const [coach, setCoach] = useState(null)
  const updateCoach = (coach) => setCoach(coach)

  const handleNewError = useCallback((error) => {
    addToast(error, { appearance: 'error', autoDismiss: true });
  }, [addToast]);

  const formSchema = yup.object().shape({
    email: yup.string().required('Please enter your email').typeError('Please enter a string.'),
    password: yup.string().required('Please enter a password.').typeError('Please enter a string.'),
    confirmpassword: yup.string().required('Please enter the same password.').typeError('Please enter a string.'), 
    profile_picture: yup.string().url('Please enter a valid URL for the profile picture'),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      team: "",
      password: "",
      confirmpassword: "",
      profile_picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      console.log("val", values)
      if (values.password !== values.confirmpassword) {
        handleNewError("Password must match.");
        return;
      }
  
      try {
        fetch(`http://127.0.0.1:5555/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
  
        .then(res => {
          if (res.ok) {
              res.json().then(resObj => {
                updateCoach(resObj.coach)
                localStorage.setItem("jwt_token", resObj.token)
                localStorage.setItem("refresh_token", resObj.refresh_token)
              })
              navigate('/userhome');
          } else {
              res.json().then(errorObj => {
              dispatch(addError(errorObj.message));
              handleNewError(errorObj.message);
            });
          }
      })
      } catch (error) {
        console.error('An unexpected error occurred', error);
        handleNewError(error);
      }
    },
  });

  const handleInputChange = (e) => {
    const trimmedValue = e.target.value.trim();
    formik.handleChange(e);
    formik.setFieldValue(e.target.name, trimmedValue);

  };

  return (
    <>
      <Head/>
      
      <div className='modal'>
      <Segment style={{ background: 'rgba(255, 255, 255, 0.8)' }}>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Field>
          <label>Email</label>
          <input className='signup'
          id='email'
          name="email"
          onChange={handleInputChange}
          value={formik.values.email}
          placeholder="Enter Email"
          required="true"
        />
        </Form.Field>
        <Form.Field>
          <label>Name</label>
          <input className='signup'
          id='name'
          name="name"
          onChange={handleInputChange}
          value={formik.values.name}
          placeholder="Enter Name"
          required="true"
        />
        </Form.Field>
        <Form.Field>
          <label>Team</label>
          <input className='signup'
          id='team'
          name="team"
          onChange={handleInputChange}
          value={formik.values.team}
          placeholder="Enter team"
        
        />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input className='signup'
          id='password'
          name="password"
          type="password"
          onChange={handleInputChange}
          value={formik.values.password}
          placeholder="Enter Password"
          required="true"
        />
        </Form.Field>
        <Form.Field>
          <label>Confirm Password</label>
          <input className='signup'
          id='confirmpassword'
          name="confirmpassword"
          type="password"
          onChange={handleInputChange}
          value={formik.values.confirmpassword}
          placeholder="Confirm Password"
          required="true"
        />
        </Form.Field>
        <Button type='submit'>Submit</Button>
        <Button type='submit' onClick={() => navigate('/')}>Cancel</Button>
      </Form>
      </Segment>
      <Image src='https://lh3.googleusercontent.com/pw/ABLVV86k4qM0ri9AI2PxDSuF3w9fipkD5Nem4zp_TiKGaUCzIVsspN0d5uD_aqNWOc5r5WMLStXKGfWVXURsBfLen55t8RNgV7cqfQMOGVJaq62HeY0gqjDX3wV_kAw-MR-pISdwM2CDIllOuanxBHSTc7wq-Lkdye1JTvX9AsB4hJZCh9WCxU68Xlf3bK4QEq8a6rcHAcgdvCWaMOLhWyf4wTBT3-AY22BSgDW0ALnbN128D2NaPBITQbScbvkuWCgKFBlwK_LnBA-zJetVXaR1jmY150xbYy7tpbNKYRJLhMa5sjnNbIMBvYsP39FHEj6WMJE_YS9SVEkWf9uNgs0Vm8A7QDF5t_KecLyOquqOICpKjtB2HhjRvC_p03Or4X8bsCBSX0-Atb6M_J89aWChbzftto7aUDYu_2XpDK1snN7n_o72Y0crLJDtxN90YiZVM0FFaMNG9VcJ1m848mo7zqHiDyeQ9TIBElcQ_E96oT1qQeTxc339wP_iEHxHs1uCvsJ1uwMTywt2eRLvz0Syki85SndOOSCw1VOjwfrb2Bqz1TaGNwiWnt2g2cvHkOvQbn-vLABNTwzVhRbaLW5gJu-cng8uGzDMibb3RQ5O5cNH_zAtr8Z0JxFuiIfcOcyckCBlBK7DNkCYsOoit-qUK5YLSqlsL2c1g8D5WuTxPOhV1bFkmsSUZmNQtT83qzgXF3pdNlDT3xXJZy7KNbSG1x-4sNw7LKGYHxsxA-0jJpYbAV6xzVs3ix4nLWYAVD55y8qTBOzUpQcYPFNdAgc_VlqtqjzXU4J0ut2DSJZ3pyGZsF4aonkyYzXauWQQA_NJox4gMZPX31nF2OL1IU5S8fuE5CJLqfHLG-dkQGqERPQKqD_jppmE39cq96voBMWmthfDy0k=w2163-h890-s-no-gm?authuser=0' size='large' centered />
      </div>
      
      </>
  );

}


export default Signup;