import { Routes, Route } from "react-router-dom";
import Title from "./Title";
import Signup from './Signup';
import Login from './Login';
import Error from './Error';
import UserHome from './UserHome';
import Services from "./Services";


function Router() {
  const routes = (
    <>
      <Route path='/' element={<Title/>} />,
      <Route path='/login' element={<Login/>} />,
      <Route path='/signup' element={<Signup/>} />,
      <Route path='/userhome' element={<UserHome/>} />,
      <Route path='/services' element={<Services/>} />,

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