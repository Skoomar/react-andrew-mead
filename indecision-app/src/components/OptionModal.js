import React from "react";
import Modal from 'react-modal';

// can use the shorthand arrow function syntax for functional components. I don't really like it tho so I'll only use it here as an example
const OptionModal = (props) => (
    <Modal
        isOpen={!!props.selectedOption}
        onRequestClose={props.handleClearSelectedOption}
        contentLabel="Selected Option"
        ariaHideApp={false}
    >
        <h3>Selected Option</h3>
        {props.selectedOption && <p>{props.selectedOption}</p>}
        <button onClick={props.handleClearSelectedOption}>Okay</button>
    </Modal>
);

export default OptionModal;