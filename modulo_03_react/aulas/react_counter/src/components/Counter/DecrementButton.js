import React, { Component } from 'react'

export default class DecrementButton extends Component {

    handleButtonClick = () => {
        this.props.onDecrement("-");
    }

    render() {
        console.log(this.props);
        return (
            <button 
                className="waves-effect waves-light btn red darken-4"
                onClick={this.handleButtonClick}
            >
                -
            </button>
        )
    }
}
