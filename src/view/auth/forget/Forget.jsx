import { useState } from "react";
import { motion } from "framer-motion"

import './forget.scss'
import { Link } from "react-router-dom";

export default function Forget(){
    const [form, setForm] = useState({
        email: "",
    });
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
        ...prevForm,
        [name]: value
        }));
    };
    
    return (
        <div className="register forget">
            <div className="title">
                <h1>Retrieve Password</h1>
                <p>Enter your Email Address to Retrieve your Password</p>
            </div>
            <div className="register_form">   
            <motion.div 
                    className='input_group'
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .3 }}
                >
                    <label>Email Address</label>
                    <input type='email' placeholder="youremail@example.com" onChange={handleChange} name='email' value={form.email} />
                </motion.div>
                <motion.div className='btn-group'
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .3 }}
                >
                    <button>REQUEST OTP</button>
                </motion.div>
            </div>
            <div className="register_foot">
                <span>Don&apos;t have an account?</span>
                <Link to={'/register'}> Sign Up</Link>
            </div>
        </div>
    )
}