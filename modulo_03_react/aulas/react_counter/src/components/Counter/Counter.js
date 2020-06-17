import React, { Component } from 'react';
import css from "./counter.module.css";
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';
import Value from './Value';
import Steps from './Steps';

class Counter extends Component{
    currentCounter;

    constructor(){
        super();

        this.state = {
            currentCounter: 2,
            steps: 0
        };
    }

    handleButtonClick = (clickType) =>{
        const { currentCounter, steps } = this.state;

        this.setState({
            currentCounter: (clickType === "+" ? currentCounter + 1 : currentCounter - 1),
            steps: steps + 1
        });
    }

    render(){
        const { currentCounter, steps } = this.state;

        return (
            <div className={css.counterConteiner}>
                <DecrementButton onDecrement={this.handleButtonClick} />
                <Value value={currentCounter} />
                <IncrementButton onIncrement={this.handleButtonClick} />
                <Steps currentStep={steps} />
            </div>
        );
    }
}

export default Counter;