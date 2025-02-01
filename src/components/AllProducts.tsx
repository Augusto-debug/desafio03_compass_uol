import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  details: string;
  img: string;
  popularity: number;
  createdAt: string;
};

const AllProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const cart = useContext(CartContext);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://run.mocky.io/v3/a586d1e8-80d1-49de-a3b7-2d2e3da931de"
      );
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    };
    fetchProducts();
  }, []);

  const handleRedirectToHome = () => navigate("/home");
  const handleRedirectToShoppingCart = () => navigate("/shoppingCart");
  const handleRedirectToProduct = (id: string) =>
    navigate(`/productDetails/${id}`);

  const applyFilters = () => {
    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }
    if (sortBy) {
      switch (sortBy) {
        case "Popularity":
          filtered.sort((a, b) => b.popularity - a.popularity);
          break;
        case "Newest":
          filtered.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "Oldest":
          filtered.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          break;
        case "High Price":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "Low Price":
          filtered.sort((a, b) => a.price - b.price);
          break;
      }
    }

    setFilteredProducts(filtered);
    setShowFilterModal(false);
  };

  return (
    <div className="relative p-5 ">
      <div className="flex justify-between items-center my-5 mx-5">
        <div>
          <img
            onClick={handleRedirectToHome}
            className="h-8 w-8"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAwElEQVR4nO3YIUpFYRCG4UcFQZNgMglGm8F6s9uyuQGDC7CYzYJXBBVXYBNMFjEYTFomqVmY4XvgLOCFc84/8xMREREREb9t4xbXGtvCI75wr6lNLCviCTsa2sBVRTxjV0PruKyIF+xpaA0XFfGKfQ2t4rwi3nCgoRWcVcQ7DjWNOK2IDyw0dVIRnzjS1HFFdHxupoQsR75aoz72Mb/fUQfiqBFl1NA4aowftVj9teo+GHD5cPdzJIiIiIiICP/sG0CFktwMi6bqAAAAAElFTkSuQmCC"
            alt="long-arrow-left"
          />
          {cart && cart.cart.length > 0 && (
            <div className="absolute right-10 top-7 text-black w-6 h-6 flex justify-center items-center rounded-full">
              {cart.cart.length}
            </div>
          )}
        </div>
        <img
          onClick={handleRedirectToShoppingCart}
          className="h-8 w-8"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACUElEQVR4nO2ZPWtUQRSGn9WAEsS0foUQNRo/QCTY5A8YCaKVnaCSqBERCQh2VoKNjQgWFhqMJhJEghEri5hSrGwUAgG/BRcNgkXErBx4L1wk7JJ1ztw7kAem2b3znvMus3PPmYEVykc/8AGo1RnfgRfACaBCSfnYwMS/Y7SsZt7nkny3xPeW9CZgEPip545TQg7JjJnoa/DsaRl5ReKsAb7JzC4SZ1RGhkicQRkZJ3F2yMjXsu5ezWzZ3STOAxk5S+KckZExEqdbRj6v/E9KxPgyazSPMRPCyFAJjMyGMLI79z+JzV3FvhJCzF6GXyS4k3isUxW+CGwNJTohI1YVx+KUYj4PKXpeoveJx4xHT7RXop+IQ5eW1DzQGlK4ouKxpiDeXFWs2x7ijyQ+gC+r1MVarF6PABckfg9fDirOW6+yaJ8CWN8fo5K47BWgkuvjtznFaAN+AX+Adhx5LCO2x3twTvrPcOaiAo046b+U/jGc2V/ngO9/2SPtKrCWCFtjVQE7A2tfl+5NIjGpgHbQHYoWVdem20MkhhXwTkDNI9J8TUR6FHTOYTccJiKrdY8Sugv8DWwgMk8Cm1gEblAAl5TALRLngIy8IXFa1PTUdMuVNJMycpLEGZCRaRJnfa5cuQZ0aGtOkqPAQsBteLpIM4cDGlkANhZlZERJ2Etys8ZUg3uVsTpz7BK2ELKq1ZLJaM/1FktRrTPnBwWRvU+2LCOp+SbmuJOdd00pMRtP9dlEwDlRrrGz05X8sOWzPeAcYmBr/aGWjA37VRsl1Mwc/gIXmFSH9pqNAQAAAABJRU5ErkJggg=="
          alt="shopping-cart--v1"
        />
      </div>
      <h1 className="text-3xl font-black">All Products</h1>

      <button
        onClick={() => setShowFilterModal(true)}
        className="p-2 mt-5 border-2 border-gray-300 w-4/5  text-black rounded-lg"
      >
        Filter
      </button>
      {showFilterModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg relative">
            <button
              onClick={() => setShowFilterModal(false)}
              className="absolute top-2 right-3 text-xl"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">Filter</h2>

            <h3 className="text-lg font-semibold mb-2">Category</h3>
            <div className="flex gap-2 mb-4">
              <button
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === "headphones"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === "headphones" ? null : "headphones"
                  )
                }
              >
                Headphone
              </button>
              <button
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === "headsets"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === "headsets" ? null : "headsets"
                  )
                }
              >
                Headset
              </button>
            </div>

            <h3 className="text-lg font-semibold mb-2">Sort By</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                "Popularity",
                "Newest",
                "Oldest",
                "High Price",
                "Low Price",
              ].map((option) => (
                <button
                  key={option}
                  className={`px-4 py-2 rounded-lg ${
                    sortBy === option
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setSortBy(sortBy === option ? null : option)}
                >
                  {option}
                </button>
              ))}
            </div>

            <button
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold"
              onClick={applyFilters}
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 mt-5">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => handleRedirectToProduct(product.id)}
            className="p-4 border rounded-lg shadow-md"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-32 object-contain rounded-md"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-sm text-gray-500">{product.category}</p>
            <p className="text-green-600 font-semibold">
              ${product.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
