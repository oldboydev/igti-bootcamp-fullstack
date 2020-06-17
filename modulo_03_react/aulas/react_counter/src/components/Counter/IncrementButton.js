import React, { Component } from 'react'

export default class IncrementButton extends Component {

    handleButtonClick = () => {
        this.props.onIncrement("+");
    }

    render() {
        console.log(this.props);
        return (
            <button 
                className="waves-effect waves-light btn green darken-4"
                onClick={this.handleButtonClick}
            >
                +
            </button>
        )
    }
}
