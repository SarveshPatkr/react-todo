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
    let { path, url } = useRouteMatch();
    console.log("url is", url, "path is", path);
    const addDataIntoCache = (cacheName, Url, response) => {
        // Converting our respons into Actual Response form
        const data = new Response(JSON.stringify(response));

        if ('caches' in window) {
            // Opening given cache and putting our data into it
            caches.open(cacheName).then((cache) => {
                cache.put(Url, data);
                alert('Data Added into cache!')
            });
        }
    };
    const signUp = () => {
        
        signIn();
    }
    const signIn = () => {
        addDataIntoCache("User", "http://localhost:3000/", {"status": true, "message": "User Signed In Successfully"});
        props.loggedin(true)
    }
    const passwordMatch = () => {
        if (newUserPassword === newUserPasswordConfirm) {
            return true
        }
        else return false
    }
    const [newUserName, setnewUserName] = useState('')
    const [newUserEmail, setnewUserEmail] = useState('')
    const [newUserPassword, setnewUserPassword] = useState('')
    const [newUserPasswordConfirm, setnewUserPasswordConfirm] = useState('')



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
                                        <input type="text" name="Name" value={newUserName} onChange={e => { setnewUserName(e.value) }} id="Name" placeholder="Name" />
                                        <EmailIcon />
                                    </div>
                                    <div className="enter-email-sec">
                                        <input type="email" name="E-mail" value={newUserEmail} onChange={e => { setnewUserEmail(e.value) }} id="E-mail" placeholder="E-mail" />
                                        <EmailIcon />
                                    </div>
                                    <div className="enter-password-sec">
                                        <input type="password" name="Password" value={newUserPassword} onChange={e => { setnewUserPassword(e.value) }} id="Password" placeholder="Password" />
                                        <LockIcon />
                                    </div>
                                    <div className="enter-password-sec">
                                        <input type="password" name="Password-confirm" value={newUserPasswordConfirm} onChange={e => { setnewUserPasswordConfirm(e.value) }} id="Password-confirm" placeholder="Confirm Password" />
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
