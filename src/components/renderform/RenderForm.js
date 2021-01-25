import React, { useReducer } from 'react';
import InputField from './fields/InputField';
import { getFieldObject, getFieldType, formStore } from './utils';


export const RenderForm = (props) => {

  const eles = [];

  const fStore = formStore();

  const jsonFields = props.config.fields;

  const formSubmit = e => {
    console.log(fStore.getState());
  };

  const setError = e => {
    fStore.setError('test3', "Error");
  };
 
  for (var i =0; i< jsonFields.length; i++) {
    const field = jsonFields[i];
    // const ele = getFieldObject(jsonFields[i], i);
    const FormField = getFieldType(field.ftype);
    eles.push(<FormField {...field} key={i} store={fStore} />);
  }
  
  return (
    <div>
      { eles }
      <button onClick={formSubmit}>Submit</button>
      <button onClick={setError}>Set Error</button>
    </div>
  );
}
