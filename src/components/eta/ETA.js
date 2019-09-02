import React from "react";
import 'firebase/firestore';
import 'firebase/functions';
import {withRouter} from "react-router-dom";
import * as firebase from "firebase";
import styles from "./eta.module.css";

class ETA extends React.Component {

    state = {
        time: 'unknown ',
        distance: 'unknown '
    };

    componentDidMount() {
        // Listen for updates to the ETA
        firebase.firestore()
            .collection('etas')
            .doc(this.props.match.params.id)
            .onSnapshot(doc => {
                this.setState(doc.data().eta);
            });
    }

    render() {
        return <div className={styles.eta}>
            <span className={styles.metric}>
                {
                    ((this.state.data || {eta: {distance: '0 miles', time: '0 min'}}).eta || {
                        distance: '0 miles',
                        time: '0 min'
                    }).time
                }
            </span>
            <span className={styles.metric}>
                {
                    ((this.state.data || {eta: {distance: '0 miles', time: '0 min'}}).eta || {
                        distance: '0 miles',
                        time: '0 min'
                    }).distance
                }
            </span>
        </div>
    }
}

export default withRouter(ETA);
