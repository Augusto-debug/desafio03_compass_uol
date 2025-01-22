const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <header>
        <div className="flex justify-between items-center px-5 py-3">
            <p>9:41</p>
            <img src="headerContainer.png" alt="" />
        </div>
        <div className="flex justify-between items-center px-5 py-3">
          <img
            src="burgerMenuIcon.png"
            className="h-10 w-10"
            alt="burgerMenuIcon"
          />
          <img src="audioLogo.png" alt="audioLogo" />
          <img src="Avatar.png" alt="avatar" />
        </div>
        <p className="text-base">Hi, Andrea</p>
        <h1 className="text-2xl font-bold">What are you looking for today?</h1>
          <div className="flex m-auto rounded-2xl items-center mt-10 border-2 w-4/5 border-gray-400">
            <img src="search.png" className="mx-4 h-12 " alt="searchIcon" />
            <input
              type="text"
              placeholder="Search Headphone"
              className="w-full h-12 pl-4 outline-none" 
            />
          </div>
      </header>

    </div>
  );
};

export default Home;
