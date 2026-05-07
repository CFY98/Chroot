function Header() {
  return (
    <div className="titlebar">
      <span className="dot dot-r"></span>
      <span className="dot dot-y"></span>
      <span className="dot dot-g"></span>
      <span
        className="titlebar-text"
        data-text="Visual Mode"
        data-hover="Change: Terminal Mode"
      ></span>
    </div>
  );
}

export default Header;
