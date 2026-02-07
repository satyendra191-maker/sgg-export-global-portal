const Footer = () => {
  return (
    <footer
      style={{
        marginTop: "auto",
        padding: "20px",
        background: "#020617",
        color: "white",
        textAlign: "center",
      }}
    >
      © {new Date().getFullYear()} SGG Export. All rights reserved.
    </footer>
  );
};

export default Footer;
