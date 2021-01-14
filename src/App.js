import React , {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import LoadDataActions from './redux/Posts/actions';

import {connect} from 'react-redux';



const App = () => {
  const [inputText, setInputText] = useState('');

  const dispatch = useDispatch();
  const {
    loadFromDataPosts,
    addItemToData,
  } = LoadDataActions;
  
  useEffect(() => {
    dispatch(loadFromDataPosts())
  }, [dispatch])
  const selectData = useSelector(state => state.users);

  function handleInput(e) {
    setInputText(prev => prev = e.target.value)
  }
  function addDataItem() {
    dispatch(addItemToData({
      name: inputText,
      surname: 'test',
      age: '212',
      bDate: Date.now()
    }))
  }
  return (
    <div className="App">
      
      <input type="test" name="add" onChange={handleInput} />
      <button type="button" onClick={addDataItem}>Add</button>
    </div>
  );
}
 
export default App;