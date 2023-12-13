import { Routes, Route } from "react-router-dom";
import Title from "./Title";
import Signup from '../features/coach/Signup';
import Login from '../features/coach/Login';
import Error from './Error';
import UserHome from '../features/coach/UserHome';
import Services from "./Services";
import Contact from "./Contact";


function Router() {
  const routes = (
    <>
      <Route path='/' element={<Title/>} />,
      <Route path='/login' element={<Login/>} />,
      <Route path='/signup' element={<Signup/>} />,
      <Route path='/userhome' element={<UserHome/>} />,
      <Route path='/services' element={<Services/>} />,
      <Route path='/contact' element={<Contact/>}/>,
      

    </>
  )
  return (
    <>
      <Routes>
        {routes}
        <Route path="/:error" element={<Error />} />
      </Routes>
    </>
  )
}

export default Router;