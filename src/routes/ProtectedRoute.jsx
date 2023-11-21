/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '#/slice/auth/LoginSlice';


const Protected = ({ children }) => {
    const loggedin = useSelector(isAuthenticated)
    return loggedin ? <>{children}</> : <Navigate to="/login" replace />;
};

export default Protected;
