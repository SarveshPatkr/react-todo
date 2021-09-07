import React, { useState } from 'react';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import "./css/Homepage.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";

function HomePage(props) {
    const [User, setUser] = useState({
        "newUserName": "",
        "newUserEmail": "",
        "newUserPassword": "",
        "newUserPasswordConfirm": ""
    })

    let { path, url } = useRouteMatch();

    console.log("url is", url, "path is", path);



    const signUp = () => {
        fetch("http://localhost:8000/api/signup/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: User.newUserName,
                email: User.newUserEmail,
                password: User.newUserPassword,
            })
        })
    }

    const signIn = () => {
        localStorage.setItem("isLoggedIn", true);
    }



    const passwordMatch = () => {
        if (User.newUserPassword === User.newUserPasswordConfirm) {
            console.log(User.newUserPasswordConfirm)
            return true;
        }
        else return false
    }

    const inputChange = (event) => {
        setUser({
            [event.target.name]: event.target.value
        })
    }


    return (
        <div className="Home-page">
            <Router>
                <Switch>
                    <Route exact path={`${path}`}>
                        <section className="sign-in-section">
                            <div className="logo">
                                <h3><AcUnitIcon />Remember</h3>
                            </div>
                            <div className="sign-in">
                                <h2>SIGN IN</h2>
                                <div className="input-user-details">
                                    <div className="enter-email-sec">
                                        <input type="email" name="E-mail" id="E-mail" placeholder="E-mail" />
                                        <EmailIcon />
                                    </div>
                                    <div className="enter-Password-sec">
                                        <input type="password" name="Password" id="Password" placeholder="Password" />
                                        <LockIcon />
                                    </div>
                                    <div className="Proceed-btn-sec">
                                        <button className="Proceed-btn" onClick={signIn}>
                                            PROCEED <TrendingFlatIcon />
                                        </button>
                                    </div>
                                </div>
                                <div className="sign-up-link-sec">
                                    <p>Don't have an account? <Link to={`${url}signup`}>SIGN UP</Link></p>
                                </div>
                            </div>
                        </section>
                    </Route>
                    <Route exact path={`${path}signup`}>
                        <section className="sign-up-section">
                            <div className="logo">
                                <h3><AcUnitIcon />Remember</h3>
                            </div>
                            <div className="sign-up">
                                <h2>SIGN UP</h2>
                                <div className="input-user-details">
                                    <div className="enter-name-sec">
                                        <input type="text"  minLength="3" name="newUserName" value={User.newUserName} onChange={inputChange} id="Name" placeholder="Name" />
                                        <EmailIcon />
                                    </div>
                                    <div className="enter-email-sec">
                                        <input type="email"  minLength="5" name="newUserEmail" value={User.newUserEmail} onChange={inputChange} id="E-mail" placeholder="E-mail" />
                                        <EmailIcon />
                                    </div>
                                    <div className="enter-password-sec">
                                        <input type="text"  minLength="8" name="newUserPassword" value={User.newUserPassword} onChange={inputChange} id="Password" placeholder="Password" />
                                        <LockIcon />
                                    </div>
                                    <div className="enter-password-sec">
                                        <input type="password"  minLength="8" name="newUserPasswordConfirm" value={User.newUserPasswordConfirm} onChange={inputChange} id="Password-confirm" placeholder="Confirm Password" />
                                        <LockIcon />
                                    </div>
                                    <div className="proceed-btn-sec">
                                        <button className="Proceed-btn" disabled={!passwordMatch()} onClick={signUp}>
                                            PROCEED <TrendingFlatIcon />
                                        </button>
                                    </div>
                                </div>
                                <div className="sign-in-link-sec">
                                    <p>Already have an account? <Link to={`${url}`}>SIGN IN</Link></p>
                                </div>
                            </div>
                        </section>
                    </Route>
                </Switch>
                <section className="hero-section"></section>
            </Router>
        </div>
    )
}

export default HomePage
