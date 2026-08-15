import React from 'react'
import { useAuth } from '../hooks/useAuth.js'; 
import {Navigate} from 'react-router'     
import Loader from '../../../components/Loader.jsx'

const Protected = ({children}) => {
    // const navigate = useNavigate();

    const {loading,user} = useAuth()
    if (loading){
        return <Loader />;
    }
    if(!user) {
        return <Navigate to={'/login'}/>
    }


  return children
}

export default Protected