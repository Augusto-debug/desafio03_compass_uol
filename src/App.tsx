import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignScreen from './components/SignInScreen';
import SignUpScreen from './components/SignUpScreen';
import Home from './components/Home';
import Search from './components/Search';
import AllProducts from './components/AllProducts';
import ShoppingCart from './components/ShoppingCart';

function App() {
  return (
    <div className="App">
        <Routes> 
          <Route path="/" element={<SignScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/allProducts" element={<AllProducts />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
        </Routes>
    </div>
  );
}

export default App;
