import React from "react";
import PropTypes from 'prop-types';
import 'firebase/firestore';
import {withRouter} from "react-router-dom";
import * as firebase from "firebase";

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
    }

    render() {
        // TODO Start querying distance API and display the correct information
        return <div>
            {
                JSON.stringify(this.state.data)
            }
        </div>
    }
}

ETA.propTypes = {
    app: PropTypes.any.isRequired
};

export default withRouter(ETA);
