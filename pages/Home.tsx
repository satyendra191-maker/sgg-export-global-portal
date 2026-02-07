import React from "react";

const Home: React.FC = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      
      {/* HERO SECTION */}
      <section
        style={{
          minHeight: "80vh",
          background: "#0f172a",
          color: "white",
          display: "flex",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <div style={{ maxWidth: "800px" }}>
          <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
            Global Scale. <br />
            <span style={{ color: "#f59e0b" }}>Seamless</span> Logistics.
          </h1>

          <p style={{ fontSize: "18px", opacity: 0.9, marginBottom: "30px" }}>
            SGG Export connects premium manufacturers with global markets.
            Reliable sourcing, transparent trade, and worldwide delivery.
          </p>

          <div style={{ display: "flex", gap: "16px" }}>
            <a
              href="#/rfq"
              style={{
                background: "#f59e0b",
                color: "black",
                padding: "14px 24px",
                fontWeight: "bold",
                textDecoration: "none",
                borderRadius: "6px",
              }}
            >
              START RFQ
            </a>

            <a
              href="#/products"
              style={{
                border: "2px solid white",
                color: "white",
                padding: "14px 24px",
                fontWeight: "bold",
                textDecoration: "none",
                borderRadius: "6px",
              }}
            >
              VIEW PRODUCTS
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "40px", background: "#f8fafc" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "20px",
            textAlign: "center",
          }}
        >
          <div>
            <h2>45+</h2>
            <p>Countries Served</p>
          </div>
          <div>
            <h2>1.2M</h2>
            <p>Annual Tonnage</p>
          </div>
          <div>
            <h2>250+</h2>
            <p>Verified Suppliers</p>
          </div>
          <div>
            <h2>1500+</h2>
            <p>Global Clients</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "60px 40px",
          background: "#f59e0b",
          color: "black",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "36px", marginBottom: "20px" }}>
          Ready to Expand Your Reach?
        </h2>
        <p style={{ fontSize: "18px", marginBottom: "30px" }}>
          Partner with SGG Export for reliable global trade solutions.
        </p>
        <a
          href="#/contact"
          style={{
            background: "black",
            color: "white",
            padding: "14px 28px",
            fontWeight: "bold",
            textDecoration: "none",
            borderRadius: "30px",
          }}
        >
          CONTACT US
        </a>
      </section>
    </div>
  );
};

export default Home;
