/* eslint-disable no-unused-vars */
import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext, useState } from "react";
import { Button} from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import firebaseConfig from "./firebase.config";
import '../Login/Login.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
const Login = () => {
  const [userInfo, setUserInfo] = useState({
    isSignIn: false,
    email: "",
    password: "",
  });

  const [oldUser] = useState(false);

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: location };

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, email } = result.user;
        const signedInUser = { displayName, email };
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorMessage);
      });
  };

  const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        const user = result.user;
        const { displayName, email } = result.user;
        const signedInUser = { displayName, email };
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  };
  //
  const handleChange = (e) => {
    let userData = { ...userInfo };
    userData[e.target.name] = e.target.value;
    setUserInfo(userData);
  };

  const handleSubmit = (e) => {
    if (!oldUser && userInfo.email && userInfo.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(userInfo.email, userInfo.password)
        .then((res) => {
          setLoggedInUser(res.user);
          history.replace(from);
          console.log("User Sign Successfully");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    }
    e.preventDefault();
  };

  return (
    <div className="loginPage">
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto">
            <form onSubmit={handleSubmit} className='border p-3 m-5'>
              <h3 className="text-center">Sign In</h3>

              <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" name="email" onChange={handleChange} placeholder="Enter email" required  />
              </div>
              <br />
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" name='password' onChange={handleChange} placeholder="Enter password" required/>
              </div>
              <br />
              <div className="form-group d-flex ">
                <div className="custom-control custom-checkbox ">
                  <input type="checkbox" className="custom-control-input" id="customCheck1" />
                  <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>

                <div className="forgotPassword  text-right">
                  <p>
                    <Link to="/forgotPassword">Forgot password?</Link>
                  </p>
                </div>
                <br />
              </div>

              <br />
              <button type="submit" className="btn btn-primary btn-block text-center submit-button">Submit</button>
              <p className="forgot-password text-center">
                Don't have an account? <Link to="/registration">Create an account</Link>
              </p>
            </form>
            <br />

            <div className="orBtn text-center">
              <span className="text-center">Or</span>
              <p className="text-center">______</p>
            </div>
            <div className="socialLink text-center ">
              <Button onClick={handleFbSignIn} className="m-5"  >
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </Button>
              <Button onClick={handleGoogleSignIn} >
                <FontAwesomeIcon icon={faGoogle} size="2x" />
              </Button>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
