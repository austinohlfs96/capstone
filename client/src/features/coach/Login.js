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
      <Image src='https://lh3.googleusercontent.com/pw/ABLVV86eykuClMvHBq9EjGRJlUr8kNFbB9oPGfive53cbB7o1jdkIUxB38RhrRTITjbPgMfoNv0nHQW2LbkRpurwbkbb-eYd4CBdSgvnaOjzcBB6bw_daCn78oFNzIH399zmN3IVt8hNVFk3on4H7gzfP3EWKxsnS2bcd0Q4zVZff0UtZUOVIg8nbcc56ngDHQCn-VmJE-fzTNwgkQnmxTxrVZTwR2obewZcAzJ57aaOgF98Uh7uRIFzrdGXh9X4Huzltwvu2J-h6AnqMrq-byioQ1RWYCI0HkugABUwgXWZICKXvutJCqMeMLswlpk7UHqyprDZG5y-_RpUG6chmfR_UQkhMUbs8pqF-cgoL2IqneeS0uLuCiUNqGxVJrEW5of0TRhbN-A8oIZK3F81P6G4QLtEEMPt0RL6BNOziEUzCbyBYOv-0-Lj315RccQMWnVWxZXnMDCCl_mx22NFXs8LwvcenLIgiqAFF6qngJZR8HJlxFWJ8R6QMkfQYQg86N-dwXsY23W3vQ08EXVMwTR5KRrVIwFYO_86P69zvoiexVJauQarK8UJZdfE_Kys0hsznUeK4IfvoN-YIoMv-ASDTIeTuaDB2askfGEzzux1MVNLcDlis9WhU5HIuNaiLzzEkUmtjteMKADLYplMAHNn8Yxh6qp_6FYH3l5FcvU0sm7ehFS1chFKwNSgbldG_aI8kp4fWTw_uzHG5XvV31VoMMPeU5ZLYJTpPicaREtevCM3mjVBXwFUH_TRTEKAJ_S30EblosNg6FBTQzlLbWmBOyi82HDfAn2KMN8EEIIW7Tmmsm3k_ktR5iLviObo0Vrg92Z-G-DqBAevMpyj0hI2B52RGgafX1PtGPw6uTv204uu8ni-LNABibtuRDxTUSrQDP2htls=w768-h1024-s-no-gm?authuser=0' size='medium' centered />
     
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
