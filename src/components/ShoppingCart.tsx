import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const context = useContext(CartContext);
  const handleRedirectToHome = () => navigate("/home");
  if (!context) {
    return <p>Loading...</p>;
  }

  const { cart, updateQuantity, removeItem, clearCart, totalPrice } = context;

  return (
    <div className="w-full h-full p-4">
      <div className="flex justify-between items-center">
        <p>9:41</p>
        <img src="headerContainer.png" alt="" />
      </div>
      <div className="flex justify-between mt-5 items-center">
      <img
          onClick={handleRedirectToHome}
          className="h-8 cursor-pointer object-contain"
          src="chevron-left.png"
          alt="Voltar"
        />
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
        <button onClick={clearCart} className="text-red-500 text-xl">🗑</button>
      </div>

      <div className="mt-4">
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 border-b">
              <img src={item.img} alt={item.name} className="w-16 h-16 rounded-lg" />
              <div className="flex-1 ml-4">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm font-bold">USD {item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 border rounded">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 border rounded">+</button>
              </div>
              <button onClick={() => removeItem(item.id)} className="ml-4 text-red-500"><img src="" alt="" /></button>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-between text-lg mt-auto font-semibold">
        <span>Total {cart.length} Items</span>
        <span>USD {totalPrice.toFixed(2)}</span>
      </div>
      <button className="w-full py-2 bg-green-500 mt-52 text-white font-bold rounded">Proceed to Checkout</button>
    </div>
  );
};

export default ShoppingCart;