import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

type Review = {
  userId: string;
  userName: string;
  rating: number;
  comment: string;
};
type ProductProps = {
  id: string;
  name: string;
  price: number;
  img: string;
  description: string;
  details: string;
  reviews: Review[];
};

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [selectedTab, setSelectedTab] = useState<"overview" | "features">(
    "overview"
  );
  const navigate = useNavigate();
  const cart = useContext(CartContext);
  const handleAddToCart = () => {
    if (product && cart) {
      cart.addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img,
        quantity: 1,
      });
    }
    navigate("/shoppingCart");
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://run.mocky.io/v3/a586d1e8-80d1-49de-a3b7-2d2e3da931de"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleRedirectToHome = () => navigate("/home");
  const handleRedirectToShoppingCart = () => navigate("/shoppingCart");

  useEffect(() => {
    const foundProduct = products.find((product) => product.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [products, id]);

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <div className="p-5 mx-auto">
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
      <div className="mt-5">
        <p className="text-green-500 font-semibold">USD {product.price}</p>
        <h1 className="text-2xl font-bold">{product.name}</h1>

        <div className="flex gap-5 border-b mt-3">
          <button
            className={`pb-2 font-semibold ${
              selectedTab === "overview"
                ? "border-b-2 border-black"
                : "text-gray-400"
            }`}
            onClick={() => setSelectedTab("overview")}
          >
            Overview
          </button>
          <button
            className={`pb-2 font-semibold ${
              selectedTab === "features"
                ? "border-b-2 border-black"
                : "text-gray-400"
            }`}
            onClick={() => setSelectedTab("features")}
          >
            Features
          </button>
        </div>
        {selectedTab === "overview" ? (
          <>
            <div className="flex justify-center mt-5">
              <img
                src={product.img}
                alt={product.name}
                className="w-52 h-52 rounded-2xl"
              />
            </div>

            <div className="mt-5">
              <h2 className="text-lg font-semibold">
                Reviews ({product.reviews.length})
              </h2>
              {product.reviews.map((review) => (
                <div
                  key={review.userId}
                  className="border-b py-3 mt-5 flex gap-3"
                >
                  <img
                    src="/Avatar.png"
                    alt={review.userName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col w-full items-center justify-center">
                    <p className="font-semibold">{review.userName}</p>
                    <p className="text-yellow-500">
                      {"⭐".repeat(review.rating)}
                    </p>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="mt-20">
            <h2 className="text-lg font-semibold">Highly Detailed Audio</h2>
            <p className="text-gray-600 mt-3">{product.details}</p>
          </div>
        )}
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-green-500 text-white py-3 rounded-lg mt-10 font-semibold"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductDetails;
