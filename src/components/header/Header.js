import headerLogo from './../../images/logo.svg';

function Header() {
  return (
    <header className="header" >
      <img
        src={headerLogo}
        className="header__logo"
        lang="en"
        alt="Mesto"
      />
    </header>
  );
}

export default Header;
