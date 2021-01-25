import React, { Fragment, useEffect, useState } from 'react';
import { errorListner, valueChangeListener } from '../utils';


function InputField(props) {

    const [v, setValue] = useState(props.fvalue || "");
    const [em, setError] = useState(null);

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
                />
            { em && <span> { em } </span>}
        </Fragment>
    );
}


export default InputField;
