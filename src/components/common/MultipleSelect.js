import React from 'react';


function MultipleSelect(props) {
    /*
    Props:
        onValueChange -> fn: Lift state up
        options -> v: Options 
        v -> v: initial value
    */

    const valuChange = e => {
        const selectedOptions = e.target.selectedOptions;
        const final_value = [];
        for (let i=0; i<selectedOptions.length; i++) {
            final_value.push(selectedOptions[i].value);
        }

        {
            props.onValueChange && props.onValueChange(final_value);
        }
    }; 

    return (
        <select multiple={true} onChange={valuChange} value={props.v}>
            { props.options }
        </select>
    );
}


export default MultipleSelect;
