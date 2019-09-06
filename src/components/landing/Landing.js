import React from "react";
import styles from './landing.module.css'

class Landing extends React.Component {

    render() {
        return <div className={styles.landing}>
            No ETA ID provided. To track an ETA, go to {window.location.href}&lt;ETA ID&gt;
        </div>
    }
}

export default Landing;
