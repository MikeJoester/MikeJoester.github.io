import './App.css';
import { useContext } from 'react';
import {Context} from './context/Context';

import {
  Login,
  Home,
  Register,
  Post,
  UserInfo,
  RecoverPass,
} from './pages';

import {
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  const {user} = useContext(Context);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={user ? <Home/> : <Login/>}/>
        <Route exact path="/register" element={user ? <Home/> : <Register/>}/>
        <Route exact path="/home" element={user ? <Home/> : <Login/>}/>
        <Route exact path="/post/:cateID/:postID" element={user ? <Post/> : <Login/>}/>
        <Route exact path="/user" element={user ? <UserInfo/> : <Login/>}/>
        <Route exact path="/recover" element={<RecoverPass/>}/>
      </Routes>
    </div>
  );
}

export default App;
