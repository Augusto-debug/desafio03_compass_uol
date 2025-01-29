import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      <div className="flex justify-between items-center px-5 py-3">
        <p>9:41</p>
        <img src="headerContainer.png" alt="" />
      </div>
      <div className="flex justify-between items-center my-5 mx-5">
        <img
          onClick={handleRedirectToHome}
          className="h-8 cursor-pointer object-contain"
          src="chevron-left.png"
          alt="Voltar"
        />
        <img
          onClick={handleRedirectToShoppingCart}
          className="h-8 cursor-pointer object-contain"
          src="shopping-cart.png"
          alt="Carrinho"
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
