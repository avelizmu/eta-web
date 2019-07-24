import React from "react";
import PropTypes from 'prop-types';
import 'firebase/firestore';
import 'firebase/functions';
import {withRouter} from "react-router-dom";
import * as firebase from "firebase";
import styles from './eta.module.css';

class ETA extends React.Component {

    state = {};

    componentDidMount() {
        const db = firebase.firestore();
        db
            .collection('etas')
            .doc(this.props.match.params.id)
            .onSnapshot(doc => {
                this.setState({data: doc.data()})
            });
        firebase.functions().httpsCallable('updateETA')({id: this.props.match.params.id});
        setInterval(() => {
            firebase.functions().httpsCallable('updateETA')({id: this.props.match.params.id})
        }, 65000)
    }

    render() {
        // TODO Start querying distance API and display the correct information
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

ETA.propTypes = {
    app: PropTypes.any.isRequired
};

export default withRouter(ETA);
