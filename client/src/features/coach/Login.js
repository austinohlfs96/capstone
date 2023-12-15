import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useDispatch } from "react-redux";
import { setCurrentCoach, addError } from "./coachSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastProvider, useToasts } from 'react-toast-notifications';
import Head from "../../components/Header";
import { Button, Divider, Form, Grid, Segment, Image } from 'semantic-ui-react';

const LoginContent = () => {
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
    <div className='modal'>
      <Head />
      <Segment placeholder>
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
      <Image src='https://lh3.googleusercontent.com/pw/ABLVV86MjhY7uFs-hQxgJvZDLNsjBZFLTbRxGVqTAk12jH9tA0ZhKguxyzqBr_sLdbOAr9mXy4VSbfmdnT-LagmezfAED3lE-fUnWd7Yi34_OtPMJFkogFifbqRQZTs1h0VKXNWior9wHNJnaysuwWyJye4uAkFJhiVNnvFnt71LxIf-rsKgCyYC4Rr5sX1PkDg5erNG7MJ0GHlUiMqX_pXcvw_fQQ-Zx26K9RNZgGuc1QI2Bqj75QQ57J8YYQaluR5pJwydrEXLlIQWYwOUWe_cgCkq9LOXtxln4ClHQ19GBnzVkU3c2jI232MgPo05hBY38hazkiTFb0cq6z8tqgVnhV9grA6ocH4wL9JEATtUM6FyXtFYoy-6W4tZWVM6ulec6p6bvBvaDFRfg-yhbZIyB_BhUsmQFjFsmOZLNM_VhMdym7N9EPqp3RRJ-XvAtewGfZbVsD10zkuDzbovI2kZGqh5thMQppZB5kaSgRzYZns1lxh-Z7dJbviSOoXUk0HwI63M9hGcMzSgezaIxWKshG1dvW0Porl1Pn4OhuM5KT7XWxSAMgJYffu-Y0FgAampMJQPQs_vqeffTPfHkouJWvqArfzhYwv8VLPq3BHrclGhr1Be-oiTYR5hvcl7RrGQqKxRuX3ewoJ6yyqtF-sGVV6RCwX6Y2izwGniIkKpn4CPms4GwlFfUZZ9lgww1h9Plydjx_3-34NQ4B1MxFbVizuTn8N_zDnBTjNo_s5IHJlpX4FIWT2UKw56pAlN44ciFoe375htHkVwaFDx5x0Qx6faIFZaaOXz7_tVmFUpgf2B2LqFhP7-DvYumXReNUFOlajC_rFmG9lF2ESLDyGa3E20zq952LOkQSV0HppWCV9kaqUu79gkKh_S7HIBwnMcUAR3dhA=w768-h1024-s-no-gm?authuser=0' size='medium' centered />
    </div>
  );
};

const Login = () => {
  return (
    <ToastProvider>
      <LoginContent />
    </ToastProvider>
  );
};

export default Login;
