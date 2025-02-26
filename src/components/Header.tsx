const Header = () => {
  return (
    <>
      <div className="flex justify-between items-center px-5 py-3">
        <img
          src="burgerMenuIcon.png"
          className="h-full w-7 object-contain"
          alt="burgerMenuIcon"
        />
        <img src="audioLogo.png" alt="audioLogo" className="h-full w-1/5 object-contain" />
        <img src="Avatar.png" alt="avatar" className="h-full w-7 object-contain"/>
      </div>
    </>
  );
};

export default Header;
