import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { registerStart, registerSuccess, registerFailure } from '#/store/registrationSlice';
import { loginSuccess } from "#/slice/auth/LoginSlice";
// import { useRegisterUser } from '#/api/registrationApi';
import { register } from "#/service/authService";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {registerSchema} from "#/utility/validation/auth/Auth";



import './register.scss'
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Register(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const state = useSelector((state) => state);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const togglePasswordConfirmVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleRegister = async (values) => {
        dispatch(registerStart());
        setErrors({});
        try {
            const response = await register(values);
            setErrors({});
            if(response.success){
                setErrors({});
                dispatch(loginSuccess(response.data))
                dispatch(registerSuccess(response.data));
                navigate('/assets')
            }else{
                setErrors(response.errors);
                dispatch(registerFailure(response.errors));
            }
            // Redirect or show a success message
        } catch (error) {
            toast.error(error.message)
            dispatch(registerFailure(error.message));
        }
    };
    
    return (
        <div className="register">
        <ToastContainer />
            <div className="title">
                <h1>Get Started Trading on <Link to={'/'}><span>BitPay FX</span></Link></h1>
            </div>
            <div className="register_form">
            <Formik
                initialValues={{
                name: '',
                email: '',
                username: '',
                password: '',
                ref_code: '',
                password_confirmation: '',
                }}
                validationSchema={registerSchema}
                onSubmit={handleRegister}
            >
                <Form>
                    <motion.div 
                        className={`input_group ${errors.name ? 'border border-red-500' : ''}`}
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .1 }}
                    >
                        <label>Fullname</label>
                        <Field type="text" id="name" name="name" />
                        <ErrorMessage name="name" component="span" className="error-message text-red-500 font-light" />
                        {errors.name && (
                            <span className="error-message text-red-500 font-light">{errors.name[0]}</span>
                        )}
                    </motion.div>

                    <motion.div 
                        className={`input_group mt-8 ${errors.email ? 'border border-red-500' : ''}`}
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .2 }}
                    >
                        <label>Email Address</label>
                        <Field type='email' name='email' />
                        <ErrorMessage name="email" component="span" className="error-message text-red-500 font-light" />
                        {errors.email && (
                            <span className="error-message text-red-500 font-light">{errors.email[0]}</span>
                        )}
                    </motion.div>
                    <motion.div 
                        className={`input_group mt-8 ${errors.username ? 'border border-red-500' : ''}`}
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
                        className={`input_group mt-8 ${errors.ref_code ? 'border border-red-500' : ''}`}
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .3 }}
                    >
                        <label>Referral Code</label>
                        <Field type='text' name='ref_code' />
                        <ErrorMessage name="ref_code" component="span" className="error-message text-red-500 font-light" />
                        {errors.ref_code && (
                            <span className="error-message text-red-500 font-light">{errors.ref_code[0]}</span>
                        )}
                    </motion.div>
                    <motion.div 
                        className={`input_group mt-8 ${errors.password ? 'border border-red-500' : ''}`}
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
                    <motion.div 
                        className={`input_group mt-8 ${errors.password_confirmation ? 'border border-red-500' : ''}`}
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .5 }}
                    >
                        <label>Confirm password</label>
                        <Field type={showConfirmPassword ? 'text' : 'password'} name='password_confirmation' />
                        <ErrorMessage name="password_confirmation" component="span" className="error-message text-red-500 font-light" />
                        <span className="eye-icon" onClick={togglePasswordConfirmVisibility}>
                            { showConfirmPassword ? 'Hide' : 'Show' }
                        </span>
                        {errors.password_confirmation && (
                            <span className="error-message text-red-500 font-light">{errors.password_confirmation[0]}</span>
                        )}
                    </motion.div>
                    <motion.div className='btn-group'
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .5 }}
                    >
                        <button type="submit" disabled={state.reg.loading}>
                            {state.reg.loading ? 'Signing up...' : 'SIGN UP'}
                        </button>
                    </motion.div>
                </Form>
            </Formik>
            </div>
            <div className="register_foot">
                <span>Already have an account?</span>
                <Link to={'/login'}> Sign In</Link>
            </div>
        </div>
    )
}