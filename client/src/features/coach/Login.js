import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useDispatch } from "react-redux";
import { setCurrentCoach, addError } from "./coachSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { useToasts } from 'react-toast-notifications';
import Head from "../../components/Header";
import { Button, Divider, Form, Grid, Segment, Image } from 'semantic-ui-react';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const formSchema = yup.object().shape({
    email: yup.string().required("Please enter an email."),
    password: yup.string().required("Please enter a password.")
  });

  const handleNewError = useCallback((error) => {
    addToast(error, { appearance: 'error', autoDismiss: true });
  }, [addToast]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch('http://127.0.0.1:5555/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      })
        .then(res => {
          if (res.ok) {
            res.json().then(resObj => {
              dispatch(setCurrentCoach(resObj.coach));
              localStorage.setItem("jwt_token", resObj.token);
              localStorage.setItem("refresh_token", resObj.refresh_token);
            
            });
            
            navigate('/userhome');
          } else {
            res.json().then(errorObj => {
              dispatch(addError(errorObj.message));
              handleNewError(errorObj.message);
            });
          }
        })
        .catch(error => {
          dispatch(addError(error));
          handleNewError(error);
        });
    },
  });

  return (
   <>
      <Head />
      <div className='modal'>
      <Segment placeholder style={{ background: 'rgba(255, 255, 255, 0.8)' }}>
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
            <Form onSubmit={formik.handleSubmit} id='formikLogin'>
              <Form.Input
                label="Email"
                id='email'
                className='loginInput'
                type='text'
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Enter Email"
              />
              <Form.Input
                label="Password"
                id='password'
                className='loginInput'
                type='password' onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Enter Password"
              />
              <Button content='Login' type="submit" primary />
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign='middle'>
            <Button content='Sign up' icon='signup' size='big' onClick={() => navigate('/signup')} />
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
      <div id="loginImage">
      <Image src='https://www.snowboarder.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTk2MzUxNDI1MzY0ODMwMTQ3/modified-pipe.jpg' size='large' centered margin-bottom="57px"/>
      </div>
    </div>
    </>
  );
};

// const Login = () => {
//   return (
//     <ToastProvider>
//       <LoginContent />
//     </ToastProvider>
//   );
// };

export default Login;
