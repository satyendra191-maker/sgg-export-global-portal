const Navbar = () => {
  return (
    <nav
      style={{
        padding: "16px 32px",
        background: "#020617",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <strong>SGG Export</strong>

      <div style={{ display: "flex", gap: "16px" }}>
        <a href="#/" style={{ color: "white", textDecoration: "none" }}>Home</a>
        <a href="#/products" style={{ color: "white", textDecoration: "none" }}>Products</a>
        <a href="#/services" style={{ color: "white", textDecoration: "none" }}>Services</a>
        <a href="#/contact" style={{ color: "white", textDecoration: "none" }}>Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
