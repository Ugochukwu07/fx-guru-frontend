import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast, ToastContainer } from "react-toastify";

import './contact.scss'

import TabLayout from "#/view/layout/TabLayout";
import { contactSchema } from '../../../utility/validation/conact';
import { contactUs } from "../../../service/ContactServices";

export default function Contact(){
    const navigate = useNavigate();

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);

    const handleSubmit =  async (values) => {
        setLoading(true)
        console.log(values);
        setErrors({});
        contactUs(values).then(response => {
            if(response.success){
                setErrors({});
                toast.success('Message Received');
            }else{
                setLoading(false)
                if(response.errors){
                    setErrors(response.errors);
                }else{
                    toast.error(response.message)
                }
            }
            return response
        }).then(res => {
            if(res.success){
                setTimeout(() => navigate('/home'), 2000);
            }
        })
    }
    return <TabLayout  nav="assets">
        <div className="contact register">
            <ToastContainer />
                <div className="title">
                    <h1>You can drop a message for us.</h1>
                </div>
                <div className="register_form">
                    <Formik
                        initialValues={{
                        first_name: '',
                        last_name: '',
                        email: '',
                        subject: '',
                        message: ''
                        }}
                        validationSchema={contactSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <motion.div 
                                className={`input_group ${errors.name ? 'border border-red-500' : ''}`}
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: .1 }}
                            >
                                <label>First Name</label>
                                <Field placeholder="John" type='text' name='first_name' />
                                <ErrorMessage name="first_name" component="span" className="error-message text-red-500 font-light" />
                                {errors.first_name && (
                                    <span className="error-message text-red-500 font-light">{errors.first_name[0]}</span>
                                )}
                            </motion.div>
                            <motion.div 
                                className={`input_group ${errors.name ? 'border border-red-500' : ''}`}
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: .1 }}
                            >
                                <label>Last Name</label>
                                <Field placeholder="Doe" type='text' name='last_name' />
                                <ErrorMessage name="last_name" component="span" className="error-message text-red-500 font-light" />
                                {errors.last_name && (
                                    <span className="error-message text-red-500 font-light">{errors.last_name[0]}</span>
                                )}
                            </motion.div>
                            <motion.div 
                                className={`input_group mt-8 ${errors.email ? 'border border-red-500' : ''}`}
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: .3 }}
                            >
                                <label>email</label>
                                <Field type='email' placeholder="example@email.com" name='email' />
                                <ErrorMessage name="email" component="span" className="error-message text-red-500 font-light" />
                                {errors.email && (
                                    <span className="error-message text-red-500 font-light">{errors.email[0]}</span>
                                )}
                            </motion.div>
                            <motion.div 
                                className={`input_group mt-8 ${errors.subject ? 'border border-red-500' : ''}`}
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: .3 }}
                            >
                                <label>Subject</label>
                                <Field type='text' placeholder="I want to Make a Deposit..." name='subject' />
                                <ErrorMessage name="subject" component="span" className="error-message text-red-500 font-light" />
                                {errors.subject && (
                                    <span className="error-message text-red-500 font-light">{errors.subject[0]}</span>
                                )}
                            </motion.div>
                            <motion.div 
                                className={`input_group mt-8 ${errors.message ? 'border border-red-500' : ''}`}
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: .3 }}
                            >
                                <label>Message</label>
                                <Field as="textarea" type='text' placeholder="Message..." name='message' />
                                <ErrorMessage name="message" component="span" className="error-message text-red-500 font-light" />
                                {errors.message && (
                                    <span className="error-message text-red-500 font-light">{errors.message[0]}</span>
                                )}
                            </motion.div>
                            <motion.div className='btn-group'
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: .4 }}
                            >
                            <button>{ loading ? 'SUBMITTING...' : 'CONTACT US'}</button>
                            </motion.div>
                        </Form>
                    </Formik>
                </div>
                <div className="register_foot">
                    <span>Don&apos;t have an account?</span>
                    <Link to={'/register'}> Sign Up</Link>
                </div>
            </div>
    </TabLayout>
}