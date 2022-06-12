import React, { useContext } from 'react'
import { Route, Navigate,Outlet } from 'react-router-dom';
import { DataContext } from '../context/DataContext';


const ProtectedRoute = ({isEnabled, ...props}) => {
    const {data} = useContext(DataContext)
    
    return (data.estado) ? <Outlet />  : <Navigate to="/login"/>;
};


export default ProtectedRoute