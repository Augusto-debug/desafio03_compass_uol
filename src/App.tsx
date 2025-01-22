import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignScreen from './components/SignInScreen';
import SignUpScreen from './components/SignUpScreen';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
        <Routes> 
          <Route path="/" element={<SignScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/home" element={<Home />} />
        </Routes>
    </div>
  );
}

export default App;
