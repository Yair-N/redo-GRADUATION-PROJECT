import {React, useState} from 'react';
import './App.css';


function App() {
  const [value, setValue] = useState('')
  const onChange = (event) =>{
    setValue(event.target.value);
  }

const onSearch  = (searchTerm) =>{
 // my search API
}

  return (
    <div className="App">
      <header className="App-header">
      <input type='text' value={value} onChange={onChange}/>
      </header>
    </div>
  );
}

export default App;
