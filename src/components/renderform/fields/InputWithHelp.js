import React, { Fragment, useEffect, useState } from 'react';
import { errorListner, getOptionsForValueHelp, valueChangeListener } from '../utils';


function InputWithHelp(props) {

    const [valueHelps, setValueHelps] = useState([]);
    const [em, setError] = useState(null);
    const [v, setValue] = useState(props.fvalue || "");

    { 
        props.valueHelp && useEffect(() => {
            getOptionsForValueHelp(props.valueHelp)
            .then(vh => {
                setValueHelps(vh)
            })
            .catch(console.debug("Failed to fetch valuehelps"));
        }, []);
    }

    useEffect(() => {
        props.store.subscribeForError(props.name, errorListner(setError));
        return () => props.store.unSubscribeForError(props.name);
    }, []);

    return (
        <Fragment>
            { props.label && <label> {props.label} </label> }
            <input type={props.ftype || "text"} 
                value={v} 
                onChange={valueChangeListener(props.store, props.name, setValue)}
                list={"id_" + props.fname + "_dl"}
                />
            { em && <span> { em } </span>}
            <datalist id={"id_" + props.fname + "_dl"}>
                { valueHelps }
            </datalist>
        </Fragment>
    );
}


export default InputWithHelp;
