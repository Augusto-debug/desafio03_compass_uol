import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignScreen from './components/SignInScreen';
import SignUpScreen from './components/SignUpScreen';

function App() {
  return (
    <div className="App">
        <Routes> 
          <Route path="/" element={<SignScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
        </Routes>
    </div>
  );
}

export default App;
