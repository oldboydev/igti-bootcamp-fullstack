import React, { Component } from 'react'

export default class Toggle extends Component {
    handleChange = (event) => {
        const { onToggle } = this.props;
        const isChecked = event.target.checked;

        onToggle(isChecked);
    }

    render() {
        const { enabled } = this.props;

        return (
            <div className="switch">
            <label>
              Mostrar Usuarios
              <input type="checkbox" onChange={this.handleChange} checked={enabled}/>
              <span className="lever"></span>
            </label>
            </div>
        )
    }
}
