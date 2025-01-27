import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
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
  reviews: [
    {
      userId: string;
      userName: string;
      rating: number;
      comment: string;
      postedAt: string;
    }
  ];
  popularity: number;
  createdAt: string;
};

const Home = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/search");
  };

  const [userName, setUserName] = useState<string | null>(null);
  const [data, setData] = useState<Product[]>([]);
  console.log(data);
  
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
    };
    fecthData();
  }, []);
  return (
    <div className="w-full h-screen flex flex-col">
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
            onClick={handleRedirect}
          />  
        </div>
      </header>
      <main className="bg-gray-100 rounded-3xl flex justify-center items-center flex-col">
        <div className="flex flex-col">
          <div className="flex my-5 justify-around items-center">
          <input
            type="button"
            value="HeadPhone"
            className="p-2 flex bg-green-600 rounded-lg"
          />
          <input
            type="button"
            value="HeadSet"
            className="p-2 flex bg-green-600 rounded-lg"
          />
          </div>
          {data &&
            data.map((item) => (
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                category={item.category}
                price={item.price}
                details={item.details}
                img={item.img}
              />
            ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
