import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Item from "./Item";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
// import { Carousel } from "@material-tailwind/react";
 

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  details: string;
  img: string;
  reviews: [
    {
      userId: string;
      userName: string;
      rating: number;
      comment: string;
      postedAt: string;
    }[]
  ];
  popularity: number;
  createdAt: string;
};

const Home = () => {
  const navigate = useNavigate();
  const handleRedirectToSearch = () => navigate("/search");
  const handleRedirectToAllProducts = () =>  navigate("/allProducts");
  const handleRedirectToProduct = (id: string) => navigate(`/productDetails/${id}`);

  const [userName, setUserName] = useState<string | null>(null);
  const [data, setData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("headphones");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || "Usuário");
      } else {
        setUserName(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fecthData = async () => {
      const response = await fetch(
        "https://run.mocky.io/v3/a586d1e8-80d1-49de-a3b7-2d2e3da931de"
      );
      const data = await response.json();
      setData(data);
      const initialFilteredData = data.filter(
        (item: Product) => item.category === "headphones"
      );
      setFilteredData(initialFilteredData);
    };
    fecthData();
  }, []);

  const handleFilter = (category: string) => {
    setSelectedCategory(category);
    setFilteredData(data.filter((item) => item.category === category));
  };
  return (
    <div className="w-full h-screen overflow-x-hidden flex flex-col">
      <header className="mb-10">
        <Header />
        <p className="text-2xl mt-2">Hi, {userName}</p>
        <h1 className="text-4xl mt-2 font-bold">
          What are you looking for today?
        </h1>
        <div className="flex m-auto rounded-3xl items-center mt-10 border-2 w-4/5 border-gray-400">
          <img src="search.png" className="mx-4 h-10 " alt="searchIcon" />
          <input
            type="text"
            placeholder="Search Headphone"
            className="w-full h-12 pl-4 outline-none"
            onClick={handleRedirectToSearch}
          />
        </div>
      </header>
      <main className="bg-gray-100 rounded-3xl flex w-full justify-center items-center flex-col">
        <div className="flex flex-col w-full">
          <div className="flex my-5 m-auto items-center">
            <input
              type="button"
              value="HeadPhone"
              className={`p-2 mx-8 flex cursor-pointer rounded-lg ${
                selectedCategory === "headphones"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleFilter("headphones")}
            />
            <input
              type="button"
              value="HeadSet"
              className={`p-2 flex cursor-pointer rounded-lg ${
                selectedCategory === "headsets"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleFilter("headsets")}
            />
          </div>
          <Carousel
            showThumbs={false}
            autoPlay={true}
            infiniteLoop
          >
            {filteredData &&
              filteredData.map((item) => (
                <div key={item.id} onClick={() => handleRedirectToProduct(item.id)}>
                  <Item
                    name={item.name}
                    category={item.category}
                    price={item.price}
                    details={item.details}
                    img={item.img}
                  />
                </div>
              ))}
          </Carousel>
        </div>
        <div className="w-full my-10 flex flex-col ">
          <div className="flex justify-around mb-10">
            <p className="text-base font-normal">Featured Products</p>
            <button onClick={handleRedirectToAllProducts} className="text-base font-normal text-gray-400">
              See All
            </button>
          </div>
          <div className="">
            <div className="w-4/5 mx-auto"></div>
            <Carousel
              showThumbs={false}
              autoPlay={true}
              infiniteLoop
            >
              {data.slice(0, 3).map((item) => (
                <div key={item.id} onClick={() => handleRedirectToProduct(item.id)}>
                  <Item
                    name={item.name}
                    category={item.category}
                    price={item.price}
                    details={item.details}
                    img={item.img}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
