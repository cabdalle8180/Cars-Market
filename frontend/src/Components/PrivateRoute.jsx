import React from 'react'
import { useAppContext } from '../Context/AppContex'
import { Outlet ,Navigate} from 'react-router-dom';

function PrivateRoute() {
    const { currentUser } = useAppContext();
  return currentUser ? <Outlet/> : <Navigate to="/signin" />;

}

export default PrivateRoute