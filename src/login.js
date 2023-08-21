import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Validation from './loginValidation'
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import usePostApi from './usePostApi';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    // const postApi = usePostApi();

    const navigate = useNavigate();
    
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
        setErrors(prevErrors => ({ ...prevErrors, [event.target.name]: "" }));
    };

    const [errors, setErrors] = useState({})
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        if (!validationErrors.email && !validationErrors.password) {
            console.log("Sending values:", values);
            
            axios.post('http://127.0.0.1:8000/api/user/login/', values)
                .then(res => {
                    console.log("Response from server:", res);
                    console.log(res.data)
                    if (res.status === 201) {
                        navigate('/home');
                    } else {
                        alert("No record existed");
                    }
                })
                .catch(err => console.log(err));

        }
    }
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const validationErrors = Validation(values);
    //     setErrors(validationErrors);
    //     if (!validationErrors.email && !validationErrors.password) {
    //         console.log("Sending values:", values);

    //         try {
    //             const res = await postApi(`${process.env.REACT_APP_BASE_URL}/api/login`, values);
    //             console.log("Response from server:", res);
    //             if (res.data === "Success") {
    //                 navigate('/home');
    //             } else {
    //                 alert("No record existed");
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }

    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Sign-In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='enter email' name='email' className="form-control rounded-0"
                            onChange={handleInput} />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Password"><strong>Password</strong></label>
                        <input type="Password" placeholder='enter Password' name='password' className="form-control rounded-0"
                            onChange={handleInput} />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <button className='btn btn-success w-100 rounded-0' type='submit' > Log in </button>
                    <p>You areagree to our terms and policies</p>
                    <Link to="/signup" className="btn btn-default border w-100 rounded-0 text-decoration-none">Create Account</Link>
                </form>
            </div>
        </div>
    )
}
export default Login