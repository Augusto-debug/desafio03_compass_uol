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
          className="h-10 w-10"
          alt="burgerMenuIcon"
        />
        <img src="audioLogo.png" alt="audioLogo" className="h-10 w-1/5" />
        <img src="Avatar.png" alt="avatar" className="h-10 w-10"/>
      </div>
    </>
  );
};

export default Header;
