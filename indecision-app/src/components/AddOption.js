import React from "react";

class AddOption extends React.Component {
    // use the syntax for babel transform-class-properties instead of using a constructor
    state = {
        error: undefined
    }

    handleAddOption = (e) => {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();

        const error = this.props.handleAddOption(option);
        this.setState(() => {
            return {error}
        })

        if (!error) {
            e.target.elements.option.value = '';
        }
    }

    render() {
        return (
            <div>
                {this.state.error && <p className="add-option-error">{this.state.error}</p>}
                <form className="add-option" onSubmit={this.handleAddOption}>
                    <input className="add-option__input" type="text" name="option"/>
                    <button className="button">Add Option</button>
                </form>
            </div>
        );
    };
};

export default AddOption;