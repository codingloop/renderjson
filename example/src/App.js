import React from 'react'

import { RenderForm } from 'renderjson'
import 'renderjson/dist/index.css'


// label: inp.label,
//         ftype: inp.ftype,
//         name: inp.name,
//         fvalue: inp.fvalue,
//         validationAPI: inp.validationAPI,
//         valueHelp: inp.valueHelp, // API or KV list
//         getMoreFields: inp.getMoreFields,
//         mandatory: inp.mandatory,
//         index: inp.index
const formConfig = {
  fields: [
    {label: "ssks", ftype: "text", name: "test"},
    {label: "ssks", ftype: "inputwithhelp", name: "test2", valueHelp: {
      'aasdaskj': 'aasdaskj',
      'bsdaksdksd': 'bsdaksdksd'
    }},
    {label: "ssks", ftype: "password", name: "testp"},
    {label: "ssks", ftype: "date", name: "testd"},
    {label: "ssks", ftype: "time", name: "testt"},
    {label: "ssks", ftype: "text", name: "test3"},
    {label: "skelcte", ftype: "select", name: "test4", fValue: 'b', valueHelp: {
      'a': 'slect a',
      'b': 'slect b'
    }},
    {label: "Multi select field", fvalue: ['Opt 1', 'Opt 3'], ftype: "multiselect", name: "field5", valueHelp: {
      'Opt 1': 'Select 1',
      'Opt 2': 'Select 2',
      'Opt 3': 'Select 3',
      'Opt 4': 'Select 4',
      'Opt 5': 'Select 5',
      'Opt 6': 'Select 6'
    }}
  ]
}

const App = () => {
  return <RenderForm config={formConfig} />
}

export default App
