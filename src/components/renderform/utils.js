import React from 'react';
import { FieldsTypes } from './constants';
import InputField from './fields/InputField';
import InputWithHelp from './fields/InputWithHelp';
import SelectField from './fields/SelectField';
import MultiSelect from './fields/MultiSelect';


const ACTIONS = {
    UPDATEVALUE: "updatevalue"
};

const rootReducer = (state, action) => {
    const valueReducer = (valueStates={}, data) => {
        return {...valueStates, ...data}
    };

    if (action.type === ACTIONS.UPDATEVALUE) {
        return {values: valueReducer(state.values, action.data)};
    }
};

const formStore = () => {
    let state = {values: {}};
    // let valueListeners = [];
    const errorListeners = {};

    const getState = () => state;

    const dispatch = action => {
        state = rootReducer(state, action);
    };

    // const subscribeForValue = listener => {
    //     listeners.push(listener);
    // };

    const setError = (name, errorMessage) => {
        if (errorListeners[name]) errorListeners[name](errorMessage);
    };

    const subscribeForError = (name, listener) => {
        errorListeners[name] = listener;
    };

    const unSubscribeForError = (name) => {
        delete errorListeners[name];
    };

    return { getState, dispatch, setError, subscribeForError, unSubscribeForError };
};

export const valueChangeListener = (store, name, setValue) => e => {
    setValue(e.target.value);
    store.dispatch({
        type: ACTIONS.UPDATEVALUE,
        data: {[name]: e.target.value}
    });
};

export const errorListner = setError => errorMessage => {
    setError(errorMessage);
};

const getFieldObject = (inp, index) => (
    {
        label: inp.label,
        ftype: inp.ftype,
        name: inp.name,
        fvalue: inp.fvalue,
        validationAPI: inp.validationAPI,
        valueHelp: inp.valueHelp, // API or KV list
        getMoreFields: inp.getMoreFields,
        mandatory: inp.mandatory,
        index: index
    }
);

const getFieldType = ftype => {
    switch(ftype) {
        case FieldsTypes.InputField:
            return InputField;
        case FieldsTypes.InputWithHelp:
            return InputWithHelp;
        case FieldsTypes.PasswordField:
            return InputField;
        case FieldsTypes.DateField:
            return InputField;
        case FieldsTypes.TimeField:
            return InputField;
        case FieldsTypes.Select:
            return SelectField;
        case FieldsTypes.MultiSelect:
            return MultiSelect;
        default:
            return null;
    }
};

const _convertJsonToOptions = obj => {
    const optionList = [];
    for (let k in obj) {
        optionList.push(<option value={k} key={k} >{obj[k]}</option>);
    }
    return optionList;
};

const getOptionsForValueHelp = (valueHelp) => {
    if (typeof(valueHelp) === "string") {
        return new Promise((resolve, reject) => {
            fetch(valueHelp)
            .then(res => resolve(_convertJsonToOptions(res.json())))
            .catch(reject("Failed to fetch data"))
        });
    } else {
        return new Promise((resolve, reject) => {
            resolve(_convertJsonToOptions(valueHelp));
            return;
            reject("Not coming in here");
        });
    }
};


export {getFieldObject, getOptionsForValueHelp, getFieldType, formStore, ACTIONS};