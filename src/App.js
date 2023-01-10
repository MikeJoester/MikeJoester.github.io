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
  Category,
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
        <Route path="/register" element={user ? <Home/> : <Register/>}/>
        <Route path="/home" element={user ? <Home/> : <Login/>}/>
        <Route path="/category/:cateID" element={user ? <Category/> : <Login/>}/>
        <Route path="/post/:cateID/:postID" element={user ? <Post/> : <Login/>}/>
        <Route path="/user" element={user ? <UserInfo/> : <Login/>}/>
        <Route path="/recover" element={<RecoverPass/>}/>
      </Routes>
    </div>
  );
}

export default App;
