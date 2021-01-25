import React, { Fragment, useEffect, useState }  from 'react';
import { errorListner, getOptionsForValueHelp, valueChangeListener } from '../utils';


function SelectField(props) {
    const [valueHelps, setValueHelps] = useState([]);
    const [v, setValue] = useState(props.fvalue || "");
    const [em, setError] = useState(null);

    useEffect(() => {
        getOptionsForValueHelp(props.valueHelp)
        .then(vh => setValueHelps(vh))
        .catch(console.debug("Error in fetching details"));
    }, []);

    useEffect(() => {
        props.store.subscribeForError(props.name, errorListner(setError));
        return () => props.store.unSubscribeForError(props.name);
    }, []);

    return (
        <Fragment>
            { props.label && <label> {props.label} </label> }
            <select value={v}
                onChange={valueChangeListener(props.store, props.name, setValue)}
                >
                {valueHelps}
            </select>
            { em && <span> { em } </span>}
        </Fragment>
    );
}


export default SelectField;
