import React , {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import LoadDataActions from './redux/Posts/actions';
import {v4 as uuid} from 'uuid';

import './App.css';

import {
  Header,
  Dashboard,
  Wrapper
} from './components/'


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
  const posts = useSelector(state => state.posts.posts);

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
      <Header />
      <Dashboard />
      <Wrapper>
        <div>
          <input type="test" name="add" onChange={handleInput} />
          <button type="button" onClick={addDataItem}>Add</button>
          <div>
            {posts.length ? posts.map(item => (
              <div key={uuid()} >{item.name}</div>
            )) : 'Пока что ничего нет'}
          </div>
        </div>
      </Wrapper>
      
    </div>
  );
}
 
export default App;