import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { Link } from 'react-router-dom';
const Registration = () => {
    const [newUser] = useState(false);
    const [user, setUser] = useState({
        isCreated: false,
        name: "",
        email: "",
        password: "",
        error: "",
    });
    const handleChange = (e) => {
        let isFieldValid = true;
        if (e.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === "password") {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const users = { ...user };
            users[e.target.name] = e.target.value;
            setUser(users);
        }
    };
    const handleSubmit = (e) => {
        if (!newUser && user.email && user.password && user.name) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const registerUser = { ...user };
                    registerUser.isCreated = true;
                    registerUser.error = "";
                    setUser(registerUser);
                    userName(user.name);
                })
                .catch((error) => {
                    const registerUser = { ...user };
                    registerUser.isCreated = false;
                    registerUser.error = error.message;
                    setUser(registerUser);
                });
        }
        e.preventDefault();
    };
    const userName = (name) => {
        const user = firebase.auth().currentUser;
        user
            .updateProfile({
                displayName: name,
            })
            .then(() => {
                console.log("update successfully");
            })
            .catch((error) => {
                console.log(error.message);
            });
    };
    return (
        <div className="loginPage">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <form onSubmit={handleSubmit} className='border p-3 m-5'>
                            <div className="errorMessage">
                                <span className="errorMain"> {user.error}</span>
                                <strong>
                                    {user.isCreated && (
                                        <span>Your account successfully created</span>
                                    )}
                                </strong>
                            </div>
                            <h3 className="text-center">Sign Up</h3>

                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" className="form-control" name="email" onChange={handleChange} placeholder="Email" required />
                            </div>
                            <br />
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" name='password' onChange={handleChange} placeholder="Password" required />
                            </div>
                            <br />
                            <div className="form-group">
                                <label>Repeat Password</label>
                                <input type="password" className="form-control" name='password' onChange={handleChange} placeholder="Confirm Password" required />
                            </div>

                            <br />
                            <button type="submit" className="btn btn-primary btn-block text-center submit-button">Create an account</button>
                            <p className="forgot-password text-center">
                                Already have an account? <Link to="/login">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;