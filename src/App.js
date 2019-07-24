import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ETA from "./components/eta/ETA";
import firebase from 'firebase/app';
import 'firebase/firestore';

class App extends React.Component {

    constructor(props) {
        super(props);

        if (!firebase.apps.length) {
            const app = firebase.initializeApp({
                apiKey: "AIzaSyBusc5OoZNvI9a_-KebMAKGSnNdyEIe3Vw",
                authDomain: "eta1-8185c.firebaseapp.com",
                databaseURL: "https://eta1-8185c.firebaseio.com",
                projectId: "eta1-8185c",
                storageBucket: "eta1-8185c.appspot.com",
                messagingSenderId: "745760776891",
                appId: "1:745760776891:web:5c4a16756b916797"
            });

            this.state = {app};
        }
    }


    render() {
        return <div className="App">
            <Router>
                <Switch>
                    <Route exact path='/:id' render={() => <ETA app={this.state.app || {}}/>}/>
                    <Route path='/'/>
                </Switch>
            </Router>
        </div>
    }
}

export default App;
