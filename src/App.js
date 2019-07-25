import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ETA from "./components/eta/ETA";
import firebase from 'firebase/app';
import 'firebase/firestore';
import {firebaseOptions} from '../config';

class App extends React.Component {

    constructor(props) {
        super(props);

        if (!firebase.apps.length) {
            const app = firebase.initializeApp(firebaseOptions);
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
