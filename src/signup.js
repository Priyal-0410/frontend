import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Validation from "./signupvalidation";
import axios from 'axios';

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleInput = (event) => {
        setValues(prevValues => ({ ...prevValues, [event.target.name]: event.target.value }));
    };


    useEffect(() => {
        console.log("Updated values:", values);
    }, [values]);

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    const handleSubmit = async (event) => {
        event.preventDefault();

        const refreshTokenUrl = 'https://accounts.zoho.in/oauth/v2/token';
        const refreshTokenParams = new URLSearchParams({
            refresh_token: '1000.324b624335d40d5f4a91498c471d296b.4b59545bcf7d6b397cf6cc39c155bc7f',
            client_id: '1000.AR2ISX7D24X3UQTJXV576U5D6WUW6W',
            client_secret: 'ce8ca3c9b0cc85afcacb9994f4c3784218169438bb',
            redirect_uri: 'http://www.zoho.com/books',
            grant_type: 'refresh_token'
        });

        try {
            const tokenResponse = await axios.post(refreshTokenUrl, refreshTokenParams);
            console.log('token Response Data:', tokenResponse.data);
            if (tokenResponse.data && tokenResponse.data.access_token) {
                
                const createContactUrl = 'https://www.zohoapis.in/books/v3/contacts?organization_id=60023332648';
                const contactData = {
                    contact_type: 'vendor',
                    // Include other required data for the contact
                };
                try {
                    const contactResponse = await axios.post(createContactUrl, contactData, {
                        headers: {
                            'Authorization': `Bearer ${tokenResponse.data.access_token}`
                        }
                    });
                    console.log('Contact creation response:', contactResponse.data); 
                    if (contactResponse.data) {
                        const validationErrors = Validation(values);
                        setErrors(validationErrors);
                        if (!validationErrors.name && !validationErrors.email && !validationErrors.password) {
                            try {
                                const response = await axios.post('http://127.0.0.1:8000/api/user/signup/', values);
                                if (response.data) {
                                    navigate('/');
                                }
                            } catch (error) {
                                console.error('An error occurred:', error);
                            }
                        }
                    } else {
                        console.error('Contact creation failed:', contactResponse.data);
                    }
                } catch (contactError) {
                    console.error('Contact creation error:', contactError);
                }
            }
            else {
                console.error('Token refresh failed:', tokenResponse.data);
            }

        }
        catch (tokenError) {
            console.error('Token refresh error:', tokenError);
        }

    };


    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100" >
            <div className="bg-white p-3 rounded w-25">
                <h2>Sign-Up </h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder='enter name' name='name'
                            onChange={handleInput} className="form-control rounded-0"
                        />
                        {errors.name && <span className="text-danger">{errors.name}</span>}


                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='enter email' name='email'
                            onChange={handleInput} className="form-control rounded-0"
                        />
                        {errors.email && <span className="text-danger">{errors.email}</span>}

                    </div>
                    <div className="mb-3">
                        <label htmlFor="Password">Password</label>
                        <input type="Password" placeholder='enter Password' name='password'
                            onChange={handleInput} className="form-control rounded-0"
                        />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <button className='btn btn-success w-100 rounded-0' type="submit " > SignUp</button>
                    <Link to="/" className="btn btn-default border w-100 rounded-0 text-decoration-none">Login</Link>
                </form>
            </div>
        </div>
    )
}


export default Signup