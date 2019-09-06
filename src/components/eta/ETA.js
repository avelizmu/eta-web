import React from "react";
import 'firebase/firestore';
import 'firebase/functions';
import {withRouter} from "react-router-dom";
import * as firebase from "firebase";
import styles from "./eta.module.css";
import Changing from "../changing/Changing";

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
                const data = doc.data();
                if (data !== undefined) {
                    this.setState(data.eta);
                } else {
                    this.setState({
                        time: 'unknown ',
                        distance: 'unknown '
                    })
                }
            });
    }

    render() {
        return <div className={styles.eta}>
            <div className={styles.metric}>
                <Changing value={this.state.time}/>
            </div>
            <div className={styles.metric}>
                <Changing value={this.state.distance}/>
            </div>
        </div>
    }
}

export default withRouter(ETA);
