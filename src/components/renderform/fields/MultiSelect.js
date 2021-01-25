import React, { Fragment, useEffect, useState }  from 'react';
import MultipleSelect from '../../common/MultipleSelect';
import { errorListner, getOptionsForValueHelp, valueChangeListener } from '../utils';


function MultiSelect(props) {
    const [valueHelps, setValueHelps] = useState([]);
    const [v, setValue] = useState(props.fvalue || []);
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

    const valueChangeHandler = newValue => {
        valueChangeListener(props.store, props.name, setValue)({target: {value: newValue}});
    };

    return (
        <Fragment>
            { props.label && <label> {props.label} </label> }
            <MultipleSelect v={v} options={valueHelps} onValueChange={valueChangeHandler} />
            { em && <span> { em } </span>}
        </Fragment>
    );
}


export default MultiSelect;
