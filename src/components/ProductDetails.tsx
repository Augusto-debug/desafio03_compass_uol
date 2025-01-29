  import { useState, useEffect,useContext } from "react";
  import { useParams } from "react-router-dom";
  import { useNavigate } from "react-router-dom";
  import { CartContext } from "../context/CartContext";

  type Review = {
    userId: string;
    userName: string;
    rating: number;
    comment: string;
  };

  type RelatedProduct = {
    id: string;
    name: string;
    price: number;
    img: string;
  };

  type ProductProps = {
    id: string;
    name: string;
    price: number;
    img: string;
    description: string;
    details : string;
    reviews: Review[];
    relatedProducts: RelatedProduct[];
  };

  const ProductDetails = () => {
    const { id } = useParams<{ id: string }>(); 
    const [product, setProduct] = useState<ProductProps | null>(null); 
    const [products, setProducts] = useState<ProductProps[]>([]); 
    const [selectedTab, setSelectedTab] = useState<"overview" | "features">("overview");
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
      <div className="p-5 max-w-md mx-auto">
        <div className="flex justify-between items-center">
          <p className="font-semibold">9:41</p>
          <img src="/headerContainer.png" alt="header" />
        </div>

        <div className="mt-5">
          <p className="text-green-500 font-semibold">USD {product.price}</p>
          <h1 className="text-2xl font-bold">{product.name}</h1>

          <div className="flex gap-5 border-b mt-3">
            <button
              className={`pb-2 font-semibold ${selectedTab === "overview" ? "border-b-2 border-black" : "text-gray-400"}`}
              onClick={() => setSelectedTab("overview")}
            >
              Overview
            </button>
            <button
              className={`pb-2 font-semibold ${selectedTab === "features" ? "border-b-2 border-black" : "text-gray-400"}`}
              onClick={() => setSelectedTab("features")}
            >
              Features
            </button>
          </div>
          {selectedTab === "overview" ? (
            <>
              <div className="flex justify-center mt-5">
                <img src={product.img} alt={product.name} className="w-52 h-52 rounded-2xl" />
              </div>

              <div className="mt-5">
                <h2 className="text-lg font-semibold">Reviews ({product.reviews.length})</h2>
                {product.reviews.map((review) => (
                  <div key={review.userId} className="border-b py-3 mt-5 flex gap-3">
                    <img src="/Avatar.png" alt={review.userName} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-semibold">{review.userName}</p>
                      <p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="mt-5">
              <h2 className="text-lg font-semibold">Highly Detailed Audio</h2>
              <p className="text-gray-600 mt-3">{product.details}</p>
            </div>
          )}
        </div>

        <button onClick={handleAddToCart} className="w-full bg-green-500 text-white py-3 rounded-lg mt-10 font-semibold">
          Add To Cart
        </button>
      </div>
    );
  };

  export default ProductDetails;
