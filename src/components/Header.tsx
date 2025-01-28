const Header = () => {
  return (
    <>
      <div className="flex justify-between items-center px-5 py-3">
        <p>9:41</p>
        <img src="headerContainer.png" alt="" />
      </div>
      <div className="flex justify-between items-center px-5 py-3">
        <img
          src="burgerMenuIcon.png"
          className="h-full w-7"
          alt="burgerMenuIcon"
        />
        <img src="audioLogo.png" alt="audioLogo" className="h-full w-1/5" />
        <img src="Avatar.png" alt="avatar" className="h-full w-7"/>
      </div>
    </>
  );
};

export default Header;
