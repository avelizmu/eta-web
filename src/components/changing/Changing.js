import React from "react";
import styles from "./changing.module.css";
import PropTypes from 'prop-types';

/**
 * Text component that animates the value changing by showing the current value rise and disappear and the next value
 * appears from below and rises up.
 */
class Changing extends React.Component {

    state = {
        first: {
            rise: false,
            invisible: false,
            fall: false,
            value: ''
        },
        second: {
            rise: false,
            invisible: true,
            fall: true,
            value: ''
        },
        current: 0,
        step: 0
    };

    /**
     * List of values that are queued up for the value change.
     * @type {Array}
     */
    pending = [];

    /**
     * ID of the current timer waiting to check for a value change.
     * Used to clear the timer if the component is dismounted.
     * @type {Number}
     */
    timeoutId = undefined;

    constructor(props, context) {
        super(props, context);

        const state = {...this.state};
        state.first.value = props.value;
        this.state = state;

        this.transitionEnded = this.transitionEnded.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.pending.push(this.props.value);
        }
    }

    /**
     * Check if there are updates in the pending values array and execute them.
     * If no updates are present, set a timeout to try again.
     */
    updateValue() {
        const next = this.pending.shift();
        const currentValue = (!this.state.current ? this.state.first : this.state.second).value;
        
        if (next && currentValue !== next && this.state.step === 0) {
            this.setState((previousState, props) => {
                const state = {...previousState};
                const current = !state.current ? state.first : state.second;
                const other = state.current ? state.first : state.second;

                current.rise = true;
                state.step = 1;

                other.value = next;
                other.invisible = false;
                other.fall = false;

                state.current = state.current ^ 1;

                return state;
            });
        } else {
            this.timeoutId = setTimeout(() => {
                this.updateValue();
            }, 400);
        }
    }

    /**
     * Triggered once the animation to swap the values has changed.
     * Changes the state of the off-screen value to be invisible and below the current value, ready to rise when the
     * value changes.
     */
    transitionEnded() {
        if (this.state.step === 1) {
            this.setState((previousState, props) => {
                const state = {...previousState};
                const other = state.current ? state.first : state.second;

                other.invisible = true;
                other.fall = true;
                other.rise = false;
                state.step = 0;

                return state;
            }, () => {
                this.timeoutId = setTimeout(() => {
                    this.updateValue();
                }, 400)
            })
        }
    }

    render() {
        return <div className={styles.wrapper}>
            <div className={[styles.changeable,
                this.state.first.rise && styles.rise,
                this.state.first.invisible && styles.invisible,
                this.state.first.fall && styles.fall].join(' ')} onTransitionEnd={this.transitionEnded}>
                {this.state.first.value}
            </div>
            <div className={[styles.changeable,
                this.state.second.rise && styles.rise,
                this.state.second.invisible && styles.invisible,
                this.state.second.fall && styles.fall].join(' ')} onTransitionEnd={this.transitionEnded}>
                {this.state.second.value}
            </div>
        </div>
    }

    componentDidMount() {
        this.timeoutId = setTimeout(() => {
            this.updateValue();
        }, 400);
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId)
    }
}

Changing.propTypes = {
    /**
     * Value to display.
     * Changing it triggers the value change and animation
     */
    value: PropTypes.string.isRequired
};

export default Changing;
