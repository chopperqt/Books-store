import React , {useState} from 'react';
import {useSelector} from 'react-redux';

import {connect} from 'react-redux';


const App = () => {

  const selectData = useSelector(state => state.users);

  console.log(selectData)
  return (
    <div className="App">
      {selectData.map(item => (
        <div>{item.name}</div>
      ))}
    </div>
  );
}
 
export default App;