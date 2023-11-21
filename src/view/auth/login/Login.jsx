import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast, ToastContainer } from "react-toastify";
import { loginSchema } from "#/utility/validation/auth/Auth";
import { login } from "#/service/authService";


import './login.scss'
import { Link } from "react-router-dom";
import { loginStart, loginFailure, loginSuccess } from "#/slice/auth/LoginSlice";

export default function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const state = useSelector((state) => state);
    const [showPassword, setShowPassword] = useState(false);
    console.log(state);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (values) => {
        dispatch(loginStart());
        setErrors({});
        try {
            const response = await login(values);
            setErrors({});
            if(response.success){
                setErrors({});
                dispatch(loginSuccess(response.data));
                navigate('/assets')

            }else{
                if(response.errors){
                    setErrors(response.errors);
                    dispatch(loginFailure(response.errors));
                }else{
                    toast.error(response.message)
                }
            }
            // Redirect or show a success message
        } catch (error) {
            toast.error(error.message)
            dispatch(loginFailure(error.message));
        }
    };
    
    return (
        <div className="register login">
        <ToastContainer />
            <div className="title">
                <h1>Welcome Back To <Link to={'/'}><span>BitPay FX</span></Link></h1>
            </div>
            <div className="register_form">
                <Formik
                    initialValues={{
                    user_id: '',
                    username: '',
                    password: '',
                    }}
                    validationSchema={loginSchema}
                    onSubmit={handleLogin}
                >
                    <Form>
                        <motion.div 
                            className={`input_group ${errors.name ? 'border border-red-500' : ''}`}
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: .1 }}
                        >
                            <label>User ID</label>
                            <Field placeholder="123456" type='number' name='user_id' />
                            <ErrorMessage name="user_id" component="span" className="error-message text-red-500 font-light" />
                            {errors.name && (
                                <span className="error-message text-red-500 font-light">{errors.name[0]}</span>
                            )}
                        </motion.div>
                        <motion.div 
                            className={`input_group mt-8 ${errors.email ? 'border border-red-500' : ''}`}
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: .3 }}
                        >
                            <label>Username</label>
                            <Field type='text' name='username' />
                            <ErrorMessage name="username" component="span" className="error-message text-red-500 font-light" />
                            {errors.username && (
                                <span className="error-message text-red-500 font-light">{errors.username[0]}</span>
                            )}
                        </motion.div>
                        <motion.div 
                            className={`input_group mt-8 ${errors.email ? 'border border-red-500' : ''}`}
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: .4 }}
                        >
                            <label>Password</label>
                            <Field type={showPassword ? 'text' : 'password'} name='password' />
                            <ErrorMessage name="password" component="span" className="error-message text-red-500 font-light" />
                            <span className="eye-icon" onClick={togglePasswordVisibility}>
                                { showPassword ? 'Hide' : 'Show' }
                            </span>
                            {errors.password && (
                                <span className="error-message text-red-500 font-light">{errors.password[0]}</span>
                            )}
                        </motion.div>
                        <Link className="forget float-right my-1 mb-3" to={'/forget'}>Forgot Password ?</Link>
                        <motion.div className='btn-group'
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: .4 }}
                        >
                            <button>{ state.login.loading ? 'LOGGING IN' : 'LOG IN'}</button>
                        </motion.div>
                    </Form>
                </Formik>
            </div>
            <div className="register_foot">
                <span>Don&apos;t have an account?</span>
                <Link to={'/register'}> Sign Up</Link>
            </div>
        </div>
    )
}