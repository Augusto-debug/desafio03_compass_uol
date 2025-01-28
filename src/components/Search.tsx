import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Item from "./Item";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  details: string;
  img: string;
  reviews: {
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    postedAt: string;
  }[];
  popularity: number;
  createdAt: string;
};

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);

  const handleRedirectToHome = () => {
    navigate("/home");
  };

  const handleRedirectToShoppingCart = () => {
    navigate("/shoppingCart");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://run.mocky.io/v3/a586d1e8-80d1-49de-a3b7-2d2e3da931de"
      );
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5">
      <Header />
      <div className="flex justify-between items-center my-5">
        <img
          onClick={handleRedirectToHome}
          className="h-8 cursor-pointer"
          src="chevron-left.png"
          alt="Voltar"
        />
        <p className="text-2xl font-semibold">Search</p>
        <img
          onClick={handleRedirectToShoppingCart}
          className="h-8 cursor-pointer"
          src="shopping-cart.png"
          alt="Carrinho"
        />
      </div>
      <div className="flex items-center bg-gray-100 rounded-full p-3 w-full max-w-lg mx-auto">
        <img src="search.png" className="h-6 mx-2" alt="searchIcon" />
        <input
          type="text"
          placeholder="Search headphone"
          className="w-full bg-transparent outline-none placeholder-gray-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mt-10">
        {filteredProducts.length > 0 ? (
          <Item
            key={filteredProducts[0].id}
            name={filteredProducts[0].name}
            category={filteredProducts[0].category}
            price={filteredProducts[0].price}
            details={filteredProducts[0].details}
            img={filteredProducts[0].img}
          />
        ) : (
          <p className="text-xl text-gray-500 text-center mt-5">No products found</p>
        )}
      </div>
      <div className="mt-10">
        <p className="text-xl font-semibold mb-5">Popular product</p>
        <div className="space-y-4">
          {products.slice(0, 3).map((product) => (
            <Item
              key={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              details={product.details}
              img={product.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
